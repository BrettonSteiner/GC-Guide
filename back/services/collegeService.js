module.exports = {
  createCollege: createCollege,
  getColleges: getColleges,
  updateCollege: updateCollege,
  deleteCollege: deleteCollege,
  importColleges: importColleges
};

const collegeDummyData = require('../public/dummyData/collegeDummyData.json');
const College = require('../models/college');

function createCollege(req, res, next) {
  const college = new College({
    college: "College of Language and Letters",
    majors: [
      "English",
      "Spanish"
    ],
    flagColor: "Purple"
  });

  college.save()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
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