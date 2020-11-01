// connection.js
const mongoose = require("mongoose");
const User = require("./models/User.model");

const connection = process.env.DATABASE_URL || "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
  console.log(connection);
  return mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = connectDb;