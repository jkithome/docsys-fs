// Dependencies needed for the API
var express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  config = require('./config'),
  routes = require('./server/routes'),
  port = process.env.PORT || 8080;

// Database connection
mongoose.connect(process.env.MONGODB_URL || config.database);
app.set('superSecret', config.secret); // secret variable

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/app/images/favicon.gif'));

// Use Morgan to log requests to the console
app.use(morgan('dev'));

// Routes
routes(app);

app.listen(port);

module.exports = app;


