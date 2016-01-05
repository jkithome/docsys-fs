module.exports = function(app) {
  var port = process.env.PORT || 8080;
  require('./users')(app);
  require('./documents')(app);
  require('./roles')(app);


  app.get('/', function(req, res) {
    // Guide users to API
    res.send('Hello! The API is at http://localhost:' + port + '/api');
  });
};
