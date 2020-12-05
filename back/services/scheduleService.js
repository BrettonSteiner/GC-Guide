module.exports = {
  createEvent: createEvent,
  getSchedule: getSchedule,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  deleteEventById: deleteEventById,
  importSchedule: importSchedule
};

const scheduleDummyData = require('../public/dummyData/scheduleDummyData.json');
const {Event} = require('../models/event');
const {Semester} = require('../models/semester');

var semesterService = require('./semesterService');

function createEvent(req, res, next) {
  const event = new Event({
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    mapSpots: req.body.mapSpots
  });

  event.save()
  .then(result => {
    // TODO: Update the Event ID list in the semester with this new ID.
    semesterService.updateSemesterEvents(req.body.semesterId, result._id);
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
}

function getSchedule(req, res, next) {
  if (req.body.semesterId != null) {
    Semester.findById(req.body.semesterId)
    .populate('events')
    .then(docs => {
      res.json({schedule: docs ? docs.events : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    Event.find()
    .then(docs => {
      res.json({schedule: docs});
    })
    .catch(err => {
      console.log(err);
    });
  }
}

function updateEvent(req, res, next) {
  Event.findByIdAndUpdate(
    req.body._id,
    {$set:{
      date: req.body.date,
      time: req.body.time,
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
      res.send(doc);
  });
}

async function deleteEvent(req, res, next) {
  var result = await deleteEventById(req.body.semesterId, req.body._id);
  res.send(result);
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

function importSchedule(req, res, next) {
  res.send('Not Implemented');
}