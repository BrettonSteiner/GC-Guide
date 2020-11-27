const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: [{
    type: String
  }],
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String
  },
  description: String,
  mapSpots: [{
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  }]
}, {timestamps: true});

const Event = mongoose.model('Event', eventSchema);

module.exports = {Event, eventSchema};