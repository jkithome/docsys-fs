(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher'),
    DocsysConstants = require('../constants/DocsysConstants'),
    assign = require('object-assign'),
    BaseStore = require('./BaseStore');

  var UserStore = assign({}, BaseStore, {
    fetchedUsers: null,
    setUsers: function(users) {
      this.fetchedUsers = users;
      this.emitChange();
    },

    getUsers: function() {
      return this.fetchedUsers;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case DocsysConstants.USER_SIGNUP:
        UserStore.setData(action.data);
        break;
      default:
        // no operation for default
    }

    return true;
  });

  module.exports = UserStore;
})();
