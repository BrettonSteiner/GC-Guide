module.exports = {
  createEvent: createEvent,
  getSchedule: getSchedule,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  importSchedule: importSchedule
};

const scheduleDummyData = require('../public/dummyData/scheduleDummyData.json');

function createEvent(req, res, next) {
  res.send('Not implemented');
}

function getSchedule(req, res, next) {
  res.send(scheduleDummyData);
}

function updateEvent(req, res, next) {
  res.send('Not implemented');
}

function deleteEvent(req, res, next) {
  res.send('Not Implemented');
}

function importSchedule(req, res, next) {
  res.send('Not Implemented');
}