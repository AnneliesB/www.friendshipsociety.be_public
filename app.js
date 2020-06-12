var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');
const connectMongo = require('connect-mongo')
const MongoStore = connectMongo(session);

var usersRouter = require('./modules/user/routes');
var questionaireRouter = require('./modules/questionaire/routes');
var submissionRouter = require('./modules/submission/routes');
var viewsRouter = require('./modules/index/routes');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('Database.conn'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not connected to Database Error', err);
})

var app = express();
app.use(cors());

app.use(session({
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: false,
    httpOnly: false,
    domain: '',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in ms,
  },
  name: 'friendshipsociety',
  secret: 'geheim',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  rolling: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/questionaire', questionaireRouter);
app.use('/submissions', submissionRouter);
app.use('/', viewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;