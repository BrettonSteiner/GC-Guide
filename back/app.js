var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var iteamRouter = require('./routes/iteamRouter');
var collegeRouter = require('./routes/collegeRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var emailRouter = require('./routes/emailRouter');
var userRouter = require('./routes/userRouter');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front/build')));

app.use('/iteams', iteamRouter);
app.use('/colleges', collegeRouter);
app.use('/schedule', scheduleRouter);
app.use('/email', emailRouter);
app.use('/users', userRouter);

module.exports = app;
