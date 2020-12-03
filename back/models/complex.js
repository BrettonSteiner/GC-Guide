const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complexSchema = new Schema({
  nameAddress: {
    type: String,
    required: true
  },
  teams: [
    {
      iTeamNumber: {
        type: Number,
        required: true
      },
      apartments: [{
        type: String
      }]
    }
  ]
}, {timestamps: true});

const Complex = mongoose.model('Complex', complexSchema);

module.exports = {Complex, complexSchema};