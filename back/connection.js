// connection.js
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connection = "mongodb://mongo:27017/mongo";

const connectDb = () => {
  mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  var db = mongoose.connection;
  db.once('open', console.log.bind(console, 'MongoDB connected!\n'));
};

module.exports = connectDb;