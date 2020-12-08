module.exports = {
  createEvent: createEvent,
  getSchedule: getSchedule,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  importSchedule: importSchedule
};

const scheduleDummyData = require('../public/dummyData/scheduleDummyData.json');
const {Event} = require('../models/event');

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
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
}

function getSchedule(req, res, next) {
  Event.find()
  .then(docs => {
    res.json({schedule: docs});
  })
  .catch(err => {
    console.log(err);
  });
  // res.send(scheduleDummyData);
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

function deleteEvent(req, res, next) {
  Event.findByIdAndRemove(req.body._id, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting event!");
    }
    res.send(doc);
  });
}

function importSchedule(req, res, next) {
  res.send('Not Implemented');
}