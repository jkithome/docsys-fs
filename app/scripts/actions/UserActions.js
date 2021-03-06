(function() {
  'use strict';
  var DocsysConstants = require('../constants/DocsysConstants'),
    BaseActions = require('./BaseActions');

  module.exports = {
    signup: function(user) {
      BaseActions.post('/api/users/create', user, DocsysConstants.USER_SIGNUP);
    },

    login: function(user) {
      BaseActions.post('/api/users/login', user, DocsysConstants.USER_LOGIN);
    },

    getUsers: function(token) {
      BaseActions.get(
        '/api/users',
        DocsysConstants.USERS_GET, token
      );
    },

    getUser: function(UserId, token) {
      BaseActions.get(
        '/api/users/' + UserId,
        DocsysConstants.USER_GET, token
      );
    },

    editUser: function(data, userId, token) {
      BaseActions.put(
        '/api/users/' + userId, data,
        DocsysConstants.USER_EDIT, token
      );
    },

    session: function(token) {
      BaseActions.get('/api/users/session', DocsysConstants.GET_SESSION, token);
    },

    logout: function(userId, data, token) {
      BaseActions.put('/api/users/logout/' + userId, data, DocsysConstants.USER_LOGOUT, token);
    }
  };
})();
