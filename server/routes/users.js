(function() {
  'use strict';
  var Users = require('../controllers/users');
  var Auth = require('../services/auth');
  module.exports = function(app) {
    // Login in user
    app.route('/api/users/login')
      .post(Users.login);
    // Log out a user
    app.route('/api/users/logout/:id')
      .put(Auth.authenticate, Users.logout);
    // Create user
    app.route('/api/users/create')
      .post(Users.create);

    // Get all users
    app.route('/api/users')
      .get(Auth.authenticate, Users.all);

    // Find, update or delete a particular user
    app.route('/api/users/:id')
      .get(Auth.authenticate, Users.find)
      .put(Auth.authenticate, Users.update)
      .delete(Auth.authenticate, Users.deleteOne);

  };
})();
