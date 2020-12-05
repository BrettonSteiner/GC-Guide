module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  getPublicITeams: getPublicITeams,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  deleteITeamById: deleteITeamById,
  importITeams: importITeams
};

const iteamDummyData = require('../public/dummyData/iteamDummyData.json');
const {ITeam} = require('../models/iTeam');
const {Semester} = require('../models/semester');

var semesterService = require('./semesterService');
var complexService = require('./complexService');

function createITeam(req, res, next) {
  ITeam.findOne({ 'iTeamNumber': req.body.iTeamNumber })
  .then(result => {
    if(result != null)
      res.send("An I-Team with that number already exists.");
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

function getITeams(req, res, next) {
  if (req.body.semesterId != null) {
    Semester.findById(req.body.semesterId)
    .populate('iTeams')
    .then(docs => {
      res.json({iTeams: docs ? docs.iTeams : []})
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    ITeam.find()
    .then(iTeams => {
      res.json({iTeams: iTeams})
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
        res.json(Object.assign({iTeams: semester.iTeams}, {complexes: complexes}));
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    res.json({iTeams: [], complexes: []});
  }
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
      res.send(doc);
  });
}

async function deleteITeam(req, res, next) {
  var result = await deleteITeamById(req.body.semesterId, req.body.iTeamId);

  if (await semesterService.isSemesterActive(req.body.semesterId)) {
    complexService.deleteITeamFromComplexes(doc.iTeamNumber);
  }

  res.send(result);
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
  res.send('Not Implemented');
}