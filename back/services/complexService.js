module.exports = {
  getComplexes: getComplexes,
  createOrUpdateComplexes: createOrUpdateComplexes,
  deleteITeamFromComplexes: deleteITeamFromComplexes,
  deleteAllComplexes: deleteAllComplexes
};
const {Complex} = require('../models/complex');

function getComplexes() {
  return Complex.find()
  .then(docs => {
    return docs;
  })
  .catch(err => {
    console.log(err);
  });
}

function createOrUpdateComplexes(complexes, iTeamNumber, oldITeamNumber = null) {
  // Remove the I-Team from any complex not included on the list
  getComplexes()
  .then(existingComplexes => {
    // Filter out all complexes that are on the list
    let nameAddresses = complexes.map(complex => calculateNameAddress(complex.name, complex.address));
    existingComplexes = existingComplexes.filter(complex => { return !nameAddresses.includes(complex.nameAddress); });

    // Find which complexes still have the iTeamNumber, but were not on the list
    existingComplexes = existingComplexes.filter(complex => {
      let iTeamNumbers = complex.teams.map(team => team.iTeamNumber);
      if (oldITeamNumber != null) {
        return iTeamNumbers.includes(oldITeamNumber);
      }
      else {
        return iTeamNumbers.includes(iTeamNumber);
      }
    });

    // Have the I-Team removed from these complexes
    existingComplexes.forEach(complex => {
      if (oldITeamNumber != null) {
        deleteITeamFromComplex(complex, oldITeamNumber);
      }
      else {
        deleteITeamFromComplex(complex, iTeamNumber);
      }
    });
  });

  // Create or Update the remaining complexes
  complexes.forEach(complex => {
    // Calculate the correct nameAddress
    const nameAddress = calculateNameAddress(complex.name, complex.address);

    // Attempt to find an existing comples with that nameAddress
    Complex.findOne({ 'nameAddress': nameAddress })
    .then(result => {
      if(result != null) {
        // Update the existing complex
        createOrUpdateComplexITeam(result, iTeamNumber, complex.apartments, oldITeamNumber);
      }
      else {
        // Create a new complex
        const complexToCreate = new Complex({
          nameAddress: nameAddress,
          teams: [{
            iTeamNumber: iTeamNumber,
            apartments: complex.apartments
          }]
        });

        // Save the new complex to the database
        complexToCreate.save()
        .then(result => {
          console.log("Created Complex:", nameAddress);
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

function calculateNameAddress(name, address) {
  // Calculate the correct nameAddress
  var nameAddress = '';
  if (name != null) {
    nameAddress = name;

    if (address != null) {
      nameAddress += " - ";
    }
  }
  if (address != null) {
    nameAddress += address;
  }

  return nameAddress;
}

function createOrUpdateComplexITeam(complex, iTeamNumber, apartments, oldITeamNumber = null) {
  var teams = complex.teams;

  // Remove the existing iTeam from teams if it is there
  if (oldITeamNumber != null) {
    teams = teams.filter(function(team) { return team.iTeamNumber != oldITeamNumber; });
  }
  else {
    teams = teams.filter(function(team) { return team.iTeamNumber != iTeamNumber; });
  }

  // Add the new version of the iTeam
  teams.push({
    iTeamNumber: iTeamNumber,
    apartments: apartments
  });

  // Update the complex
  updateComplexITeam(complex.nameAddress, teams);
}

function updateComplexITeam(nameAddress, teams) {
  // Update complex teams
  Complex.findOneAndUpdate(
    { 'nameAddress': nameAddress },
    {$set:{ teams: teams }},
    {new: true},
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating complex!");
      }
      if (doc == null) {
        console.log("Updated Complex: NULL -", nameAddress, "***BY THE WAY, YOU SHOULD NOT BE GETTING THIS MESSAGE EVER!! SOMETHING IS WRONG HERE!!!***");
      }
      else {
        console.log("Updated Complex:", nameAddress);
      }
  });
}

function deleteComplex(complexId) {
  return Complex.findByIdAndRemove(complexId, (err, doc) => {
    if (err) {
      console.log("Something wrong when deleting complex!");
    }
    return doc;
  });
}

function deleteITeamFromComplex(complex, iTeamNumber) {
  // Remove the existing iTeam from teams if it is there
  var teams = complex.teams.filter(function(team) { return team.iTeamNumber != iTeamNumber; });

  if (teams === undefined || teams.length == 0) {
    // If no teams remain, then the complex needs to be deleted, too.
    deleteComplex(complex._id);
    console.log("Deleted Complex:", complex.nameAddress);
  } else {
    // Otherwise, the complex.teams just need to be updated.
    updateComplexITeam(complex.nameAddress, teams);
  }
}

function deleteITeamFromComplexes(iTeamNumber) {
  getComplexes()
  .then(complexes => {
    complexes.forEach(complex => {
      deleteITeamFromComplex(complex, iTeamNumber);
    });
  });
}

function deleteAllComplexes() {
  Complex.deleteMany(function (err) {
    if(err) console.log(err);
    console.log("Successfully deleted all complexes.");
  });
}