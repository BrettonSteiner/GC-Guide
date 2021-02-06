module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  getPublicITeams: getPublicITeams,
  getITeam: getITeam,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  deleteITeamById: deleteITeamById,
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
        res.status(400).send("An I-Team with that number already exists in this semester.");
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
      return res.status(400).send("An I-Team with that number already exists.");
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
      res.status(200).send(doc);
  });
}

async function deleteITeam(req, res, next) {
  var result = await deleteITeamById(req.body.semesterId, req.body.iTeamId);

  if (await semesterService.isSemesterActive(req.body.semesterId)) {
    complexService.deleteITeamFromComplexes(req.body.iTeamNumber);
  }

  res.status(200).send(result);
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

function importITeams(req, res, next) {
  res.status(501).send('Not Implemented');
}