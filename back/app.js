var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDb = require('./connection');

var iteamRouter = require('./routes/iteamRouter');
var collegeRouter = require('./routes/collegeRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var emailRouter = require('./routes/emailRouter');
var userRouter = require('./routes/userRouter');

connectDb().then(() => {
    console.log("MongoDb connected");
  })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front/build')));
app.use(bodyParser.json());

app.use('/iteams', iteamRouter);
app.use('/colleges', collegeRouter);
app.use('/schedule', scheduleRouter);
app.use('/email', emailRouter);
app.use('/users', userRouter);

module.exports = app;
