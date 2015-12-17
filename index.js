// Dependencies needed for the API
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  User = require('./server/models/users'),
  Document = require('./server/models/documents'),
  routes = require('./server/routes'),
  port = process.env.PORT || 8080;

// Database connection
mongoose.connect(config.database);

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use Morgan to log requests to the console
app.use(morgan('dev'));

// Routes

routes(app);

app.listen(port);
console.log('Listening at http://localhost:' + port);
