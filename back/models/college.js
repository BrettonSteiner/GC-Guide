const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  majors: [{
    type: String
  }],
  flagColor: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const College = mongoose.model('College', collegeSchema);

module.exports = {College, collegeSchema};