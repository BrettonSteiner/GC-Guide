module.exports = {
  createITeam: createITeam,
  getITeams: getITeams,
  updateITeam: updateITeam,
  deleteITeam: deleteITeam,
  importITeams: importITeams
};

const iteamDummyData = require('../public/dummyData/iteamDummyData.json');
const {ITeam} = require('../models/iTeam');
const {Complex} = require('../models/complex');
const {ITeamPublic} = require('../models/iTeamPublic');

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
        complexes: []
      });

      iTeam.save()
      .then(result => {
        createOrUpdateComplexes(req.body.complexes, req.body.iTeamNumber);
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
  // ITeamPublic.find()
  // .populate('iTeams', 'iTeamNumber mentor1.name mentor2.name')
  // .populate('complexes', 'nameAddress teams.iTeamNumber teams.apartments')
  // .exec(function(err, publicIteamsDocs) {
  //   if (err) {
  //     console.log("Something wrong when deleting college!");
  // }
  // res.send(publicIteamsDocs);
  // });

  const iTeams = ITeam.find()
  .then(docs => {
    res.json({iTeams: docs});
    // return docs;
  })
  .catch(err => {
    console.log(err);
  });

  const complexes = Complex.find()
  .then(docs => {
    // res.json({complexes: docs});
    return docs;
  })
  .catch(err => {
    console.log(err);
  });

  // res.json({iTeams: iTeams, complexes: complexes})

  // res.send(iteamDummyData);
}

function updateITeam(req, res, next) {
  res.send('Not implemented');
}

function deleteITeam(req, res, next) {
  ITeam.findByIdAndRemove(req.body._id, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting I-Team!");
    }
    res.send(doc);
  });
  // res.send('Not Implemented');
}

function importITeams(req, res, next) {
  res.send('Not Implemented');
}

function createOrUpdateComplexes(complexes, iTeamNumber) {
  complexes.forEach(complex => {
    const nameAddress = complex.name + " - " + complex.address;
    Complex.findOne({ 'nameAddress': nameAddress })
    .then(result => {
      if(result != null) {
        console.log(createOrUpdateComplexITeam(result, iTeamNumber, complex.apartments));
      }
      else {
        const complexToCreate = new Complex({
          nameAddress: nameAddress,
          teams: [{
            iTeamNumber: iTeamNumber,
            apartments: complex.apartments
          }]
        });

        complexToCreate.save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  });
}

function createOrUpdateComplexITeam(complex, iTeamNumber, apartments) {
  var teams = complex.teams;

  //Remove the existing iTeam from teams if it is there
  teams = teams.filter(function(team) { return team.iTeamNumber != iTeamNumber; });

  //Add the new version of the iTeam
  teams.push({
    iTeamNumber: iTeamNumber,
    apartments: apartments
  });
  const complexToUpdate = new Complex({
    nameAddress: complex.nameAddress,
    teams: teams
  });

  //Update the complex
  complexToUpdate.update()
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log(err);
  });
}