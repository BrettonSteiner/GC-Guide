const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iTeamPublicSchema = new Schema({
  iTeams: [{
    type: Schema.Types.ObjectId, ref:'ITeam'
  }],
  complexes: [{
    type: Schema.Types.ObjectId, ref:'Complex'
  }]
}, {timestamps: true});

const ITeamPublic = mongoose.model('ITeamPublic', iTeamPublicSchema);

module.exports = {ITeamPublic, iTeamPublicSchema};