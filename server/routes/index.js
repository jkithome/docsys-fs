module.exports = function(app) {
  var port = process.env.PORT || 8080;
  require('./users')(app);
  require('./documents')(app);
  require('./roles')(app);


  app.get('/', function(req, res) {
    // Guide users to API
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
