var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var iteamsRouter = require('./routes/iteams');
var collegesRouter = require('./routes/colleges');
var scheduleRouter = require('./routes/schedule');
var emailRouter = require('./routes/email');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front/build')));

app.use('/', indexRouter);
app.use('/iteams', iteamsRouter);
app.use('/colleges', collegesRouter);
app.use('/schedule', scheduleRouter);
app.use('/email', emailRouter);
app.use('/users', usersRouter);

module.exports = app;
