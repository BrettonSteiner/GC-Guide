module.exports = {
  createCollege: createCollege,
  getColleges: getColleges,
  getCollege: getCollege,
  updateCollege: updateCollege,
  deleteCollege: deleteCollege,
  deleteCollegeById: deleteCollegeById,
  deleteManyCollegesById: deleteManyCollegesById,
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
        res.status(400).json({success: false, message: "A college with that name already exists in this semester."});
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
          res.status(201).json({success: true, message: "Successfully created new college."});
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

async function getColleges(req, res, next) {
  var semesterId = req.body.semesterId;
  if (semesterId == null) {
    semesterId = await semesterService.getActiveSemesterId();
  }

  if (semesterId != null) {
    Semester.findById(semesterId)
    .populate('colleges')
    .then(docs => {
      res.status(200).json({colleges: docs ? docs.colleges : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    res.status(200).json({colleges: []});
  }
}

function getCollege(collegeId) {
  return College.findById(collegeId)
  .then(docs => {
    return docs;
  })
  .catch(err => {
    console.log(err);
  });
}

function updateCollege(req, res, next) {
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
        res.status(400).json({success: false, message: "A college with that name already exists in this semester."});
      }
      else {
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
            res.status(200).json({success: true, message: "Successfully updated college."});
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

async function deleteCollege(req, res, next) {
  var result = await deleteCollegeById(req.body.semesterId, req.body.collegeId);
  res.status(200).json({success: true, message: "Successfully deleted college."});
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

function deleteManyCollegesById(collegeIds) {
  College.deleteMany({ _id: { $in: collegeIds } })
  .then(doc => {
    console.log("Successfully deleted " + doc.deletedCount + " colleges.");
  })
  .catch(err => {
    console.log(err);
  });
}

function importColleges(req, res, next) {
  // Validate / Organize incoming data
  var collegeNames = [];
  var colleges = [];
  for (const row of req.body.data) {
    var majors = [];
    if (row.majors !== null && row.majors !== undefined && row.majors !== "") {
      majors = row.majors.replace(/, /g,",").split(",");
    }

    if (row.name === null || row.name === undefined || row.name === "") {
      // Missing required field error
      res.status(400).json({success: false, message: "College(s) missing 'name' field."});
      return;
    }
    else if (row.flagColor === null || row.flagColor === undefined || row.flagColor === "") {
      // Missing required field error
      res.status(400).json({success: false, message: "College(s) missing 'flagColor' field."});
      return;
    }
    else if (collegeNames.includes(row.name)) {
      // Duplicate college error
      res.status(400).json({success: false, message: "Duplicate colleges with name '" + row.name + "'."});
      return;
    }
    else {
      // Add college name to list
      collegeNames.push(row.name);

      // Create new college
      colleges.push({
        name: row.name,
        majors: majors,
        flagColor: row.flagColor
      });
    }
  };

  // Delete all current colleges in the semester
  Semester.findById(req.body.semesterId)
  .then(docs => {
    if (docs != null&& docs.colleges !== null && docs.colleges.length > 0) {
      deleteManyCollegesById(docs.colleges);
    }
  })
  .catch(err => {
    console.log(err);
  });

  College.insertMany(colleges)
  .then(docs => {
    console.log("Successfully created " + docs.length + " colleges.")

    // Extract all of the new ids
    var newCollegeIds = [];
    docs.forEach(college => {
      newCollegeIds.push(college._id);
    });

    // Update College ID list in semester with the new IDs.
    semesterService.updateReplaceSemesterColleges(req.body.semesterId, newCollegeIds)
    .then(() => {
      // Return success status and message
      res.status(201).json({success: true, message: "Successfully imported " + newCollegeIds.length + " colleges."});
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
}