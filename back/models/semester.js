const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collegeSchema = require('./college');
const iTeamSchema = require('./iTeam');
const eventSchema = require('./event');

const semesterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  activeFlag: {
    type: Boolean,
    required: true,
  },
  colleges: [collegeSchema],
  iteams: [iTeamSchema],
  events: [eventSchema]
}, {timestamps: true});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;