const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);
const Account = mongoose.model("Account", accountSchema);

module.exports = {Account, accountSchema};