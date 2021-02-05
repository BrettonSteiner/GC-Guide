module.exports = {
  getAccounts: getAccounts,
  getCurrentAccount: getCurrentAccount,
  checkUsernameAvailability: checkUsernameAvailability,
  createAccount: createAccount,
};

const {Account} = require('../models/account');

function getAccounts(req, res, next) {
  Account.find()
  .then(accounts => {
    res.status(200).json({accounts: accounts});
  })
  .catch(err => {
    console.log(err);
  });
}

function getCurrentAccount(req, res, next) {
  res.status(200).json({username: req.user.username})
}

function isUsernameAvailable(username) {
  return Account.findOne({ 'username': username })
  .then(result => {
    return result === null;
  })
  .catch(err => {
    console.log(err);
  });
}

function checkUsernameAvailability(req, res, next) {
  isUsernameAvailable(req.body.username)
  .then(isUsernameAvailable => {
    res.status(200).json({
      isUsernameAvailable: isUsernameAvailable,
      username: req.body.username
    });
  });
}

function createAccount(req, res, next) {
  isUsernameAvailable(req.body.username)
  .then(isUsernameAvailable => {
    if (isUsernameAvailable) {
      const account = new Account({ username: req.body.username });

      // This uses the passport-local-mongoose method to set the password
      // It uses the pbkdf2 algorithm to encrypt the password.
      // Documentation: https://www.npmjs.com/package/passport-local-mongoose#hash-algorithm
      account.setPassword(req.body.password)
      .then(() => {
        account.save()
        .then(() => {
          res.status(201).redirect('/login');
        })
        .catch(err => {
          res.status(500).json({error: err});
        });
      });
    }
    else {
      res.status(400).json({error: "Username is already taken."});
    }
  });
  
}