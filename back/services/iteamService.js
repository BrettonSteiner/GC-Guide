module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  importITeams: importITeams
};

const iteamDummyData = require('../public/dummyData/iteamDummyData.json');

function createITeam(req, res, next) {
  res.send('Not implemented');
}

function getITeams(req, res, next) {
  res.send(iteamDummyData);
}

function updateITeam(req, res, next) {
  res.send('Not implemented');
}

function deleteITeam(req, res, next) {
  res.send('Not Implemented');
}

function importITeams(req, res, next) {
  res.send('Not Implemented');
}