module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  getPublicITeams: getPublicITeams,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  importITeams: importITeams
};

const iteamDummyData = require('../public/dummyData/iteamDummyData.json');
const {ITeam} = require('../models/iTeam');

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
      .then(result => {
        // TODO: Update I-Team ID list in Semester with this new ID.
        complexService.createOrUpdateComplexes(req.body.complexes, req.body.iTeamNumber);
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
  ITeam.find()
  .then(docs => {
    res.json({iTeams: docs})
  })
  .catch(err => {
    console.log(err);
  });
}

function getPublicITeams(req, res, next) {
  ITeam.find()
  .select('iTeamNumber mentor1.name mentor2.name')
  .then(iTeams => {
    complexService.getComplexes()
    .then(complexes => {
      res.json(Object.assign({iTeams: iTeams}, {complexes: complexes}));
      // res.send(iteamDummyData);
    });
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
    req.body._id,
    {$set:{
      iTeamNumber: req.body.iTeamNumber,
      mentor1: req.body.mentor1,
      mentor2: req.body.mentor2,
      complexes: req.body.complexes
    }},
    {new: true}, // This returns the updated result, not the previous result.
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating ITeam!");
      }
      complexService.createOrUpdateComplexes(req.body.complexes, req.body.iTeamNumber, req.body.oldITeamNumber);
      res.send(doc);
  });
}

function deleteITeam(req, res, next) {
  ITeam.findByIdAndRemove(req.body._id, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting I-Team!");
    }
    complexService.deleteITeamFromComplexes(doc.iTeamNumber);
    res.send(doc);
  });
}

function importITeams(req, res, next) {
  res.send('Not Implemented');
}