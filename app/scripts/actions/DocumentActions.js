(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions'),
    token = localStorage.getItem('x-access-token');

  module.exports = {
    userDocuments: function() {
      BaseActions.post('/api/users/create', user, DocsysConstants.USER_SIGNUP);
    }
  };
})();
