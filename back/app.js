var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var expressSession = require('express-session')({
  secret: 'a301762de3144fafb8ac8d55f565b1b2',
  resave: false,
  saveUninitialized: false
});
var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var logger = require('morgan');
var connectDb = require('./connection');

var semesterRouter = require('./routes/semesterRouter');
var iteamRouter = require('./routes/iteamRouter');
var collegeRouter = require('./routes/collegeRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var emailRouter = require('./routes/emailRouter');
var accountRouter = require('./routes/accountRouter');

connectDb();

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front/build')));
app.use(bodyParser.json());
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.get(['/login', '/create_account'], (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

app.get('/admin', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

app.use('/semesters', semesterRouter);
app.use('/iteams', iteamRouter);
app.use('/colleges', collegeRouter);
app.use('/schedule', scheduleRouter);
app.use('/email', emailRouter);
app.use('/accounts', accountRouter);

module.exports = app;
