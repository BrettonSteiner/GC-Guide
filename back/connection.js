// connection.js
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connection = process.env.DATABASE_URL || "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
  return mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
};

module.exports = connectDb;