(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher'),
    DocsysConstants = require('../constants/DocsysConstants'),
    assign = require('object-assign'),
    BaseStore = require('./BaseStore');

  var UserStore = assign({}, BaseStore, {
    users: null,
    signUp: null,
    session: null,
    user: null,
    userEdit: null,
    logout: null,

    setUsers: function(users) {
      this.users = users;
      this.emitChange('users');
    },

    getUsers: function() {
      return this.users;
    },

    setUser: function(user) {
      this.user = user;
      this.emitChange('user');
    },

    getUser: function() {
      return this.user;
    },

    setCreatedUser: function(signUp) {
      this.signUp = signUp;
      this.emitChange('signUp');
    },

    getCreatedUser: function() {
      return this.signUp;
    },

    setUserEdit: function(result) {
      this.userEdit = result;
      this.emitChange('userEdit');
    },

    getUserEdit: function() {
      return this.userEdit;
    },

    setSession: function(session) {
      this.session = session;
      this.emitChange('session');
    },

    getSession: function() {
      return this.session;
    },

    setUserLogout: function(logout) {
      this.logout = logout;
      this.emitChange('logout');
    },

    getUserLogout: function() {
      return this.logout;
    },

  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case DocsysConstants.USER_SIGNUP:
        UserStore.setCreatedUser(action.data);
        break;
      case DocsysConstants.USER_LOGIN:
        UserStore.setData(action.data);
        break;
      case DocsysConstants.USERS_GET:
        UserStore.setUsers(action.data);
        break;
      case DocsysConstants.USER_GET:
        UserStore.setUser(action.data);
        break;
      case DocsysConstants.USER_EDIT:
        UserStore.setUserEdit(action.data);
        break;
      case DocsysConstants.GET_SESSION:
        UserStore.setSession(action.data);
        break;
      case DocsysConstants.USER_LOGOUT:
        UserStore.setUserLogout(action.data);
        break;
      default:
        // no operation for default
    }

    return true;
  });

  module.exports = UserStore;
})();
