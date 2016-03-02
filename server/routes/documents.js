(function() {
  'use strict';
  var Documents = require('../controllers/documents'),
    Auth = require('../services/auth');
  module.exports = function(app) {
    // Create documents route
    app.route('/api/documents')
      .post(Auth.authenticate, Documents.create)
      .get(Auth.authenticate, Documents.all);

    // Route to find, update or delete a specific document
    app.route('/api/documents/:id')
      .get(Auth.authenticate, Documents.find)
      .put(Auth.authenticate, Documents.update)
      .delete(Auth.authenticate, Documents.deleteOne);

    // All documents accesscible by a user
    app.route('/api/users/:id/documents')
      .get(Auth.authenticate, Documents.allByUser);

    app.route('/api/users/:id/mydocuments')
      .get(Auth.authenticate, Documents.allUserCreated);
  };
})();
