(function() {
  'use strict';


  var AppDispatcher = require('../../../../app/scripts/dispatcher/AppDispatcher');
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var constants=require('../../../../app/scripts/constants/DocsysConstants');
  var sinon = require('sinon');
  var expect = require('chai').expect;

  describe('UserStore', function() {
    var registerSpy;

  before(function() {
    // Don't emit the change in the tests
    sinon.stub(UserStore, 'emitChange', function() {
      return true;
    });
    registerSpy = sinon.stub(AppDispatcher, 'register');
    sinon.spy(AppDispatcher, 'dispatch');
    registerSpy.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    AppDispatcher.register.restore();
    registerSpy.restore();
  });

  it('adds all fetched users', function() {
    sinon.spy(UserStore, 'setUsers');
    var userAction = {
      actionType: constants.USERS_GET,
      data: [{id: 1}, {id: 2}]
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setUsers.called).to.eql(true);
    var users = UserStore.getUsers();
    expect(users).to.eql(userAction.data);
  });

  it('adds a fetched user', function() {
    sinon.spy(UserStore, 'setUser');
    var userAction = {
      actionType: constants.USER_GET,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setUser.called).to.eql(true);
    var user = UserStore.getUser();
    expect(user).to.eql(userAction.data);
  });

  it('adds a created user', function() {
    sinon.spy(UserStore, 'setCreatedUser');
    var userAction = {
      actionType: constants.USER_SIGNUP,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setCreatedUser.called).to.eql(true);
    var user = UserStore.getCreatedUser();
    expect(user).to.eql(userAction.data);
  });

  it('adds an edited user', function() {
    sinon.spy(UserStore, 'setUserEdit');
    var userAction = {
      actionType: constants.USER_EDIT,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setUserEdit.called).to.eql(true);
    var user = UserStore.getUserEdit();
    expect(user).to.eql(userAction.data);
  });

  it('adds user session', function() {
    sinon.spy(UserStore, 'setSession');
    var userAction = {
      actionType: constants.GET_SESSION,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setSession.called).to.eql(true);
    var user = UserStore.getSession();
    expect(user).to.eql(userAction.data);
  });

  it('adds user logout', function() {
    sinon.spy(UserStore, 'setUserLogout');
    var userAction = {
      actionType: constants.USER_LOGOUT,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setUserLogout.called).to.eql(true);
    var user = UserStore.getUserLogout();
    expect(user).to.eql(userAction.data);
  });

  it('adds user login', function() {
    sinon.spy(UserStore, 'setData');
    var userAction = {
      actionType: constants.USER_LOGIN,
      data: {id: 1}
    };
    AppDispatcher.dispatch(userAction);

    expect(UserStore.setData.called).to.eql(true);
    var user = UserStore.getUserLogout();
    expect(user).to.eql(userAction.data);
  });
  });
})();