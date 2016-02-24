(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions'),
    token = localStorage.getItem('x-access-token');

  module.exports = {
    signup: function(user) {
      BaseActions.post('/api/users/create', user, DocsysConstants.USER_SIGNUP);
    },

    login: function(user) {
      BaseActions.post('/api/users/login', user, DocsysConstants.USER_LOGIN);
    },

    getUsers: function() {
      BaseActions.get(
        '/api/users',
        DocsysConstants.USERS_GET, token
      );
    },

    getUser: function(docId) {
      BaseActions.get(
        '/api/users/' + docId,
        DocsysConstants.USER_GET, token
      );
    },

    editUser: function(data, docId) {
      BaseActions.put(
        '/api/users/' + docId, data,
        DocsysConstants.USER_EDIT, token
      );
    }
  };
})();
