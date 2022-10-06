var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlconfig=require("./mssql")
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var user=require("./user_details");
var mongoose=require("./connection");
var vacation =require("./routes/users")
// sqlconfig.conn()
var app = express();
var cors=require("cors")
// var user=require("./user_details")

console.log("port was connected")

//db connection
mongoose.connect()
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',vacation );
app.use("/availablevacation/:id",user.availablevacation)
app.use ("/execute",user.getList)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
