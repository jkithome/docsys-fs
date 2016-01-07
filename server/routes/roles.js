(function() {
  'use strict';
  var Roles = require('../controllers/roles'),
    Auth = require('../services/auth');
  module.exports = function(app) {
    // Create and get all roles
    app.route('/api/roles')
      .get(Auth.authenticate, Roles.all)
      .post(Auth.authenticate, Roles.create);

    app.route('/api/roles/:id')
      .get(Auth.authenticate, Roles.find)
      .put(Auth.authenticate, Roles.update)
      .delete(Auth.authenticate, Roles.deleteOne);
  };
})();
