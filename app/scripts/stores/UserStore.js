(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher'),
    DocsysConstants = require('../constants/DocsysConstants'),
    assign = require('object-assign'),
    BaseStore = require('./BaseStore');

  var UserStore = assign({}, BaseStore, {
    users: null,

    setUsers: function(users) {
      this.users = users;
      this.emitChange('users');
    },

    getUsers: function() {
      return this.users;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case DocsysConstants.USER_SIGNUP:
        UserStore.setData(action.data);
        break;
      case DocsysConstants.USER_LOGIN:
        UserStore.setData(action.data);
        break;
      case DocsysConstants.USERS_GET:
        UserStore.setUsers(action.data);
        break;
      default:
        // no operation for default
    }

    return true;
  });

  module.exports = UserStore;
})();
