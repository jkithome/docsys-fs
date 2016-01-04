(function() {
  'use strict';
  var Documents = require('../controllers/documents'),
    Auth = require('../services/auth');
  module.exports = function(app) {
    // Create documents route
    app.route('/api/documents')
      .post(Auth.authenticate, Documents.create);

    // All documents by limit
    app.route('/api/documents/all/:limit')
      .get(Auth.authenticate, Documents.all);

    // All documents by genre
    app.route('/api/documents/genre/:genre')
      .get(Auth.authenticate, Documents.allByGenre);

    // All documents with a given word in the content field
    app.route('/api/documents/search/:term')
      .get(Auth.authenticate, Documents.allByContent);

    // All documents created on a given date
    app.route('/api/documents/:year/:month/:day/:limit')
      .get(Auth.authenticate, Documents.allByDate);

    // All documents accessible by a given role
    app.route('/api/documents/role/:role/:limit')
      .get(Auth.authenticate, Documents.allByRole);

    // Route to find, update or delete a specific document
    app.route('/api/documents/:id')
      .get(Auth.authenticate, Documents.find)
      .put(Auth.authenticate, Documents.update)
      .delete(Auth.authenticate, Documents.delete);

    // All documents accesscible by a user
    app.route('/api/users/:id/documents')
      .get(Auth.authenticate, Documents.allByUser);

    app.route('api/users/:id/mydocuments')
      .get(Auth.authenticate, Documents.allUserCreated);
  };
})();
