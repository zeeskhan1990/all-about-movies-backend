const express = require('express'),
      path = require('path'),
      //const favicon = require('serve-favicon');
      logger = require('morgan'),
      //const cookieParser = require('cookie-parser');
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      sassMiddleware = require('node-sass-middleware'),
      index = require('./routes/index'),
      users = require('./routes/users'),
      config = require('./config/main'),
      auth = require("./auth")(); 

const app = express();

//Database setup
mongoose.connect(config.database);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());
//app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error object
  res.status(err.status || 500).json({error: err});
});

module.exports = app;
