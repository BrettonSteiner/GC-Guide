const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iTeamSchema = new Schema({
  iTeamNumber: {
    type: String,
    required: true
  },
  mentor1: {
    name: String,
    phone: String
  },
  mentor2: {
    name: String,
    phone: String
  },
  complex: [{
    name: {
      type: String,
      required: true
    },
    address: [{type: String}],
  }]
}, {timestamps: true});

const ITeam = mongoose.model('ITeam', iTeamSchema);

module.exports = {ITeam, iTeamSchema};