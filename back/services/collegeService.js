module.exports = {
  createCollege: createCollege,
  getColleges: getColleges,
  updateCollege: updateCollege,
  deleteCollege: deleteCollege,
  deleteCollegeById: deleteCollegeById,
  importColleges: importColleges
};

const collegeDummyData = require('../public/dummyData/collegeDummyData.json');
const {College} = require('../models/college');
const {Semester} = require('../models/semester');

var semesterService = require('./semesterService');

function createCollege(req, res, next) {
  College.findOne({ 'name': req.body.name })
  .then(result => {
    if(result != null)
      res.send("A college with that name already exists.");
    else {
      const college = new College({
        name: req.body.name,
        majors: req.body.majors,
        flagColor: req.body.flagColor
      });

      college.save()
      .then(result => {
        // Update College ID list in semester with this new ID.
        semesterService.updateSemesterColleges(req.body.semesterId, result._id);
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function getColleges(req, res, next) {
  if (req.body.semesterId != null) {
    Semester.findById(req.body.semesterId)
    .populate('colleges')
    .then(docs => {
      res.json({colleges: docs ? docs.colleges : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    College.find()
    .then(docs => {
      res.json({colleges: docs});
    })
    .catch(err => {
      console.log(err);
    });
  }
}

function updateCollege(req, res, next) {
  College.findByIdAndUpdate(
    req.body._id,
    {$set:{
      name: req.body.name,
      flagColor: req.body.flagColor,
      majors: req.body.majors
    }},
    {new: true},
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating college!");
      }
      res.send(doc);
  });
}

async function deleteCollege(req, res, next) {
  var result = await deleteCollegeById(req.body.semesterId, req.body._id);
  res.send(result);
}

function deleteCollegeById(semesterId, collegeId) {
  return College.findByIdAndRemove(collegeId, (err, doc) => {
    if (err) {
      console.log("Something wrong when deleting college!");
    }
    // Remove collegeId from Semester colleges list
    semesterService.updateSemesterColleges(semesterId, collegeId);
    return doc;
  });
}

function importColleges(req, res, next) {
  res.send('Not Implemented');
}