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
const mongoose = require('mongoose');

var semesterService = require('./semesterService');

function createCollege(req, res, next) {
  // Get semester College Ids
  Semester.findById(req.body.semesterId)
  .then(docs => {
    var collegeObjectIds = [];
    if (docs != null) {
      docs.colleges.forEach(college => {
        collegeObjectIds.push(mongoose.Types.ObjectId(college));
      });
    }

    College.findOne({ 'name': req.body.name, '_id': { $in: collegeObjectIds} })
    .then(result => {
      if (result != null) {
        res.status(400).send("A college with that name already exists in this semester.");
      }
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
          res.status(201).send(result);
        })
        .catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
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
      res.status(200).json({colleges: docs ? docs.colleges : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    College.find()
    .then(docs => {
      res.status(200).json({colleges: docs});
    })
    .catch(err => {
      console.log(err);
    });
  }
}

function updateCollege(req, res, next) {
  College.findByIdAndUpdate(
    req.body.collegeId,
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
      res.status(200).send(doc);
  });
}

async function deleteCollege(req, res, next) {
  var result = await deleteCollegeById(req.body.semesterId, req.body.collegeId);
  res.status(200).send(result);
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
  res.status(501).send('Not Implemented');
}