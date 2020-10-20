module.exports = {
  getUsers: getUsers,
  createUser: createUser,
};

const User = require('../src/User.model');

async function getUsers(req, res, next) {
  const users = await User.find();

  res.json(users);
}

async function createUser(req, res, next) {
  const user = new User({ username: "userTest" });

  await user.save().then(() => console.log("User created"));

  res.send("User created\n");
}