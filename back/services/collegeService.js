module.exports = {
  createCollege: createCollege,
  getColleges: getColleges,
  updateCollege: updateCollege,
  deleteCollege: deleteCollege,
  importColleges: importColleges
};

const collegeDummyData = require('../public/dummyData/collegeDummyData.json');

function createCollege(req, res, next) {
  res.send('Not implemented');
}

function getColleges(req, res, next) {
  res.send(collegeDummyData);
}

function updateCollege(req, res, next) {
  res.send('Not implemented');
}

function deleteCollege(req, res, next) {
  res.send('Not Implemented');
}

function importColleges(req, res, next) {
  res.send('Not Implemented');
}