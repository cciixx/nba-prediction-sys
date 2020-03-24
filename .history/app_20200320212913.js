var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Helmet
const helmet = require('helmet');
// cors
const cors = require('cors');

// Database
const options = require('./knexfile')
const knex = require('knex')(options);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var teamIndexRouter = require('./routes/team_index');

var app = express();

// Use helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Enable cors
app.use(cors({
  origin:['http://localhost:8080'],  //指定接收的地址
  methods:['GET','POST'],  //指定接收的请求类型
  alloweHeaders:['Content-Type','Authorization']  //指定header
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use knex
app.use((req, res, next) => {
  req.db = knex
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/team_index', teamIndexRouter);

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
