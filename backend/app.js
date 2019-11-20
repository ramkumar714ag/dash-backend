var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// add mongoose 
var mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/users',(err,client) =>    {
// if(err)
// {
// return console.log('unable to connect to mongodb server');
// }
// console.log('connected successfully');
// const db = client.db('users')
// db.collection('usersadd').insertOne({
//   email: 'ramya.nr28@gmail.com',
//   username: 'r',
//   password: 'Happi@1',
//   creation_dt: Date.now()
// },(err, result)=>{
//   if(err){
//     return console.log('unable to insert',err);
//   }
//   console.log(JSON.stringify(result.ops, undefined, 2));
// });
// client.close();
// });
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/User');

// add cors 
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
