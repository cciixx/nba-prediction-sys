var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// config environment variables
require('dotenv').config();

// Helmet
const helmet = require('helmet');
// cors
const cors = require('cors');

// Database
const options = require('./knexfile')
const knex = require('knex')(options);

// Routers
var indexRouter = require('./routes/index');
var teamsRouter = require('./routes/teams');
var teamIndexRouter = require('./routes/team_index');
var playerRouter = require('./routes/players');
var predictRouter = require('./routes/predict');
var playerTransRouter = require('./routes/player_trans');
var pkRouter = require('./routes/pk');

// Logging
// var logWrite = require('fs');
// var serverLog = logWrite.createWriteStream('EventLog.log', {flags: 'a'})

// Load the certificate using synchronous call
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./sslcert/cert.key','utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem','utf8');
const credentials = {
 key: privateKey,
 cert: certificate
};

var app = express();

// Use helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 3000);

// Enable cors
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//logger
app.use(logger('dev'));
// app.use(logger('combined', {stream: serverLog}));

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
app.use('/teams', teamsRouter);
app.use('/team_index', teamIndexRouter);
app.use('/players', playerRouter);
app.use('/predict', predictRouter);
app.use('/player_trans', playerTransRouter);
app.use('/pk', pkRouter);

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

// As is customary with HTTPS, just serve the responses on port 443.
const server = https.createServer(credentials,app);
const port = process.env.PORT || 3000;

server.listen(port);

module.exports = app;
