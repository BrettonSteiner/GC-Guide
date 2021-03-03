module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  getPublicITeams: getPublicITeams,
  getITeam: getITeam,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  deleteITeamById: deleteITeamById,
  deleteManyITeamsById: deleteManyITeamsById,
  importITeams: importITeams
};

const iteamDummyData = require('../public/dummyData/iteamDummyData.json');
const {ITeam} = require('../models/iTeam');
const {Semester} = require('../models/semester');
const mongoose = require('mongoose');

var semesterService = require('./semesterService');
var complexService = require('./complexService');

function createITeam(req, res, next) {
  // Get semester I-Team Ids
  Semester.findById(req.body.semesterId)
  .then(docs => {
    var iTeamObjectIds = [];
    if (docs != null) {
      docs.iTeams.forEach(iTeamId => {
        iTeamObjectIds.push(mongoose.Types.ObjectId(iTeamId));
      });
    }
    
    ITeam.findOne({ 'iTeamNumber': req.body.iTeamNumber, '_id': { $in: iTeamObjectIds} })
    .then(result => {
      if (result != null) {
        res.status(400).json({success: false, message: "An I-Team with that number already exists in this semester."});
      }
      else {
        const iTeam = new ITeam({
          iTeamNumber: req.body.iTeamNumber,
          mentor1: req.body.mentor1,
          mentor2: req.body.mentor2,
          complexes: req.body.complexes
        });

        iTeam.save()
        .then(async result => {
          // Update I-Team ID list in Semester with this new ID.
          semesterService.updateSemesterITeams(req.body.semesterId, result._id);
          if (await semesterService.isSemesterActive(req.body.semesterId)) {
            complexService.createOrUpdateComplexes(req.body.complexes, req.body.iTeamNumber);
          }
          res.status(201).json({success: true, message: "Successfully created new I-Team."});
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

function getITeams(req, res, next) {
  if (req.body.semesterId != null) {
    Semester.findById(req.body.semesterId)
    .populate('iTeams')
    .then(docs => {
      res.status(200).json({iTeams: docs ? docs.iTeams : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    ITeam.find()
    .then(iTeams => {
      res.status(200).json({iTeams: iTeams})
    })
    .catch(err => {
      console.log(err);
    });
  }
}

async function getPublicITeams(req, res, next) {
  var activeSemesterId = await semesterService.getActiveSemesterId();

  if (activeSemesterId != null) {
    Semester.findById(activeSemesterId)
    .populate('iTeams')
    // .select('iTeams.iTeamNumber iTeams.mentor1.name iTeams.mentor2.name')
    .then(semester => {
      complexService.getComplexes()
      .then(complexes => {
        res.status(200).json(Object.assign({iTeams: semester.iTeams}, {complexes: complexes}));
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    res.status(200).json({iTeams: [], complexes: []});
  }
}

function getITeam(iTeamId) {
  return ITeam.findById(iTeamId)
  .then(docs => {
    return docs;
  })
  .catch(err => {
    console.log(err);
  });
}

async function updateITeam(req, res, next) {
  if (req.body.oldITeamNumber != null && req.body.oldITeamNumber != req.body.iTeamNumber)
  {
    var alreadyExists = await ITeam.findOne({ 'iTeamNumber': req.body.iTeamNumber })
    .then(result => {
      return result != null;
    })
    .catch(err => {
      console.log(err);
    });

    if (alreadyExists) {
      return res.status(400).json({success: false, message: "An I-Team with that number already exists."});
    }
  }

  ITeam.findByIdAndUpdate(
    req.body.iTeamId,
    {$set:{
      iTeamNumber: req.body.iTeamNumber,
      mentor1: req.body.mentor1,
      mentor2: req.body.mentor2,
      complexes: req.body.complexes
    }},
    {new: true}, // This returns the updated result, not the previous result.
    async (err, doc) => {
      if (err) {
          console.log("Something wrong when updating ITeam!");
      }
      if (await semesterService.isSemesterActive(req.body.semesterId)) {
        complexService.createOrUpdateComplexes(req.body.complexes, req.body.iTeamNumber, req.body.oldITeamNumber);
      }
      res.status(200).json({success: true, message: "Successfully updated I-Team."});
  });
}

async function deleteITeam(req, res, next) {
  var result = await deleteITeamById(req.body.semesterId, req.body.iTeamId);

  if (await semesterService.isSemesterActive(req.body.semesterId)) {
    complexService.deleteITeamFromComplexes(req.body.iTeamNumber);
  }

  res.status(200).json({success: true, message: "Successfully deleted I-Team."});
}

function deleteITeamById(semesterId, iTeamId) {
  return ITeam.findByIdAndRemove(iTeamId, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting I-Team!");
    }
    // Remove iTeamId from Semester iTeams list
    semesterService.updateSemesterITeams(semesterId, iTeamId);
    return doc;
  });
}

function deleteManyITeamsById(iTeamIds) {
  ITeam.deleteMany({ _id: { $in: iTeamIds } })
  .then(doc => {
    console.log("Successfully deleted " + doc.deletedCount + " I-Teams.");
  })
  .catch(err => {
    console.log(err);
  });
}

function importITeams(req, res, next) {
  // Validate / Organize incoming data
  var iTeamNumbers = [];
  var iTeams = [];
  for (const row of req.body.data) {
    var apartments = [];
    if (row.apartments !== null && row.apartments !== undefined && row.apartments !== "") {
      apartments = row.apartments.replace(/\s/g,"").split(",");
    }

    if (row.iTeamNumber === null || row.iTeamNumber === undefined || row.iTeamNumber === "") {
      // Missing required field error
      res.status(400).json({success: false, message: "I-Team(s) missing 'iTeamNumber' field."});
      return;
    }
    else if (iTeamNumbers.includes(row.iTeamNumber)) {
      // Edit iTeam
      index = iTeams.findIndex(iTeam => iTeam.iTeamNumber === row.iTeamNumber);

      if (index === -1) {
        console.log("Couldn't find the existing I-Team? This shouldn't happen since it was already found literally a few lines before this.");
      }
      else {
        iTeam = iTeams[index];
        complexIndex = iTeam.complexes.findIndex(complex => complex.name === row.complexName && complex.address === row.addressName);
        if (complexIndex === -1) {
          // Add new complex to the iTeam
          iTeam.complexes.push({
            name: row.complexName,
            address: row.complexAddress,
            apartments: apartments
          });
        }
        else {
          // Add new apartments to list and filter out duplicates.
          complex = iTeam.complexes[complexIndex];
          complex.apartments.concat(apartments.filter(apartment => complex.apartments.indexOf(apartment) < 0))
        }
        iTeams[index] = iTeam;
      }
    }
    else {
      // Add iTeamNumber to list
      iTeamNumbers.push(row.iTeamNumber);

      // Extract the complex if one is given
      complexes = []
      if ((row.complexName !== null && row.complexName !== undefined && row.complexName !== "")
      || (row.complexAddress !== null && row.complexAddress !== undefined && row.complexAddress !== "")) {
        complexes.push({
          name: row.complexName,
          address: row.complexAddress,
          apartments: apartments
        });
      }
      
      // Create new iTeam
      iTeams.push({
        iTeamNumber: row.iTeamNumber,
        mentor1: {
          name: row.mentor1Name,
          phone: row.mentor1Phone
        },
        mentor2: {
          name: row.mentor2Name,
          phone: row.mentor2Phone
        },
        complexes: complexes
      });
    }
  };

  // Delete all current iTeams in the semester
  Semester.findById(req.body.semesterId)
  .then(docs => {
    if (docs !== null && docs.iTeams !== null && docs.iTeams.length > 0) {
      deleteManyITeamsById(docs.iTeams);
    }
  })
  .catch(err => {
    console.log(err);
  });

  // Create all new iTeams at once
  ITeam.insertMany(iTeams)
  .then(docs => {
    console.log("Successfully created " + docs.length + " I-Teams.")

    // Extract all of the new ids
    var newITeamIds = [];
    docs.forEach(iTeam => {
      newITeamIds.push(iTeam._id);
    });

    // Update ITeam ID list in semester with the new IDs.
    semesterService.updateReplaceSemesterITeams(req.body.semesterId, newITeamIds)
    .then(async () => {
      if (await semesterService.isSemesterActive(req.body.semesterId)) {
        complexService.replaceComplexes(iTeams);
      }

      // Return success status and message
      res.status(201).json({success: true, message: "Successfully imported " + newITeamIds.length + " I-Teams."});
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
}