module.exports = {
  createEvent: createEvent,
  getScheduleData: getScheduleData,
  getSchedule: getSchedule,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  deleteEventById: deleteEventById,
  deleteManyEventsById: deleteManyEventsById,
  importSchedule: importSchedule
};

const scheduleDummyData = require('../public/dummyData/scheduleDummyData.json');
const {Event} = require('../models/event');
const {Semester} = require('../models/semester');

var semesterService = require('./semesterService');

function createEvent(req, res, next) {
  const event = new Event({
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    mapSpots: req.body.mapSpots
  });

  event.save()
  .then(result => {
    // Update the Event ID list in the semester with this new ID.
    semesterService.updateSemesterEvents(req.body.semesterId, result._id);
    res.status(201).send(result);
  })
  .catch(err => {
    console.log(err);
  });
}

async function getScheduleData(semesterId = null) {
  if (semesterId == null) {
    semesterId = await semesterService.getActiveSemesterId();
  }

  if (semesterId != null) {
    return Semester.findById(semesterId)
    .populate('events')
    .then(docs => {
      return docs ? docs.events : [];
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  return [];
}

async function getSchedule(req, res, next) {
  res.status(200).json({schedule: await getScheduleData(req.body.semesterId)})
}

function updateEvent(req, res, next) {
  Event.findByIdAndUpdate(
    req.body.eventId,
    {$set:{
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      mapSpots: req.body.mapSpots
    }},
    {new: true},
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating event!");
      }
      res.status(200).send(doc);
  });
}

async function deleteEvent(req, res, next) {
  var result = await deleteEventById(req.body.semesterId, req.body.eventId);
  res.status(200).send(result);
}

function deleteEventById(semesterId, eventId) {
  return Event.findByIdAndRemove(eventId, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting event!");
    }
    // Remove eventId from Semester events list
    semesterService.updateSemesterEvents(semesterId, eventId);
    return doc;
  });
}

function deleteManyEventsById(eventIds) {
  Event.deleteMany({ _id: { $in: eventIds } })
  .then(doc => {
    console.log("Successfully deleted " + doc.deletedCount + " events.");
  })
  .catch(err => {
    console.log(err);
  });
}

function importSchedule(req, res, next) {
  // Validate / Organize incoming data
  var events = []
  for (const row of req.body.data) {
    if (row.name === null || row.name === undefined || row.name === "") {
      // Missing required field error
      res.status(400).json({success: false, message: "Event(s) missing 'name' field."});
      return;
    }
    else if (row.date === null || row.date === undefined || row.date === "") {
      // Missing required field error
      res.status(400).json({success: false, message: "Event(s) missing 'date' field."});
      return;
    }
    else {
      // Extract the mapSpot if one is given
      mapSpots = []
      if (row.lat !== null && row.lat !== undefined && row.lat !== ""
      && row.lng !== null && row.lng !== undefined && row.lng !== "") {
        mapSpots.push({
          lat: row.lat,
          lng: row.lng
        });
      }

      // Create the new event
      events.push({
        name: row.name,
        date: row.date,
        startTime: row.startTime? row.startTime.toLowerCase() : null,
        endTime: row.endTime? row.endTime.toLowerCase() : null,
        location: row.location,
        description: row.description,
        mapSpots: mapSpots
      });
    }
  };

  // Delete all current events in the semester
  Semester.findById(req.body.semesterId)
  .then(docs => {
    if (docs !== null && docs.events !== null && docs.events.length > 0) {
      deleteManyEventsById(docs.events);
    }
  })
  .catch(err => {
    console.log(err);
  });

  // Create all new events at once
  Event.insertMany(events)
  .then(docs => {
    console.log("Successfully created " + docs.length + " events.")

    // Extract all of the new ids
    var newEventIds = [];
    docs.forEach(event => {
      newEventIds.push(event._id);
    });

    // Update Event ID list in semester with the new IDs.
    semesterService.updateReplaceSemesterEvents(req.body.semesterId, newEventIds)
    .then(async () => {
      // Return success status and message
      res.status(201).json({success: true, message: "Successfully imported " + newEventIds.length + " events."});
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
}