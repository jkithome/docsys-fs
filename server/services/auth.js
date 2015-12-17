var jwt = require('jsonwebtoken'),
  secret = require('../../config').secret;
module.exports = {
  authenticate: function(req, res, next) {
    // Check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Decode token
    if (token) {
      // Verify token
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          return res.json({
            message: 'Failed to authenticate token.'
          });
        } else {
          // If token is valid, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // If there is no token
      // return an error
      return res.status(403).send({
        message: 'No token provided.'
      });

    }
  }
};
