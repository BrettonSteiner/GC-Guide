var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var passport = require('passport');
var {Account} = require('../models/account');
var accountService = require('../services/accountService');

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/* GET accounts listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), accountService.getAccounts);

/* POST check if username is available */
router.post('/usernames', accountService.checkUsernameAvailability);

/* POST create account. */
router.post('/create', accountService.createAccount);

/* POST login to account. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {   
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({error: "Username or password is incorrect."});
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.status(307).redirect('/admin');
    });

  })(req, res, next);
});

/* GET logout of account. */
router.get('/logout', function(req, res){
  req.logout();
  res.status(200).redirect('/login');
});

module.exports = router;
