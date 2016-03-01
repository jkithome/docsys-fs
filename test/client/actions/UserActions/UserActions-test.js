(function() {
  'use strict';

  var sinon=require('sinon');
  var expect = require('chai').expect;
  var AppConstants=require('../../../../app/scripts/constants/DocsysConstants');
  var BaseActions=require('../../../../app/scripts/actions/BaseActions');
  var UserActions=require('../../../../app/scripts/actions/UserActions');

  describe('UserActions', function() {
    var fakeToken = 'token';
    var payload = {};
    var userId = 3;

    beforeEach(function() {
      sinon.stub(BaseActions, 'delete').returns(true);
      sinon.stub(BaseActions, 'get').returns(true);
      sinon.stub(BaseActions, 'post').returns(true);
      sinon.stub(BaseActions, 'put').returns(true);
    });

    afterEach(function() {
      BaseActions.delete.restore();
      BaseActions.get.restore();
      BaseActions.post.restore();
      BaseActions.put.restore();
    });

    describe('calls BaseActions', function() {
      it('login', function() {
        UserActions.login(payload);
        expect(BaseActions.post.withArgs(
          '/api/users/login',
          payload,
          AppConstants.USER_LOGIN
        ).called).to.eql(true);
      });

      it('logout', function() {
        UserActions.logout(userId, payload, fakeToken);
        expect(BaseActions.put.withArgs(
          '/api/users/logout/' + userId,
          payload,
          AppConstants.USER_LOGOUT,
          fakeToken
        ).called).to.eql(true);
      });

      it('signup', function() {
        UserActions.signup(payload);
        expect(BaseActions.post.withArgs(
          '/api/users/create',
          payload,
          AppConstants.USER_SIGNUP
        ).called).to.eql(true);
      });

      it('update', function() {
        UserActions.editUser(payload,userId, fakeToken);
        expect(BaseActions.put.withArgs(
          '/api/users/' + userId,
          payload,
          AppConstants.USER_EDIT,
          fakeToken
        ).called).to.eql(true);
      });

       it('session', function() {
        UserActions.session(fakeToken);
        expect(BaseActions.get.withArgs(
          `/api/users/session`,
          AppConstants.GET_SESSION,
          fakeToken
        ).called).to.eql(true);
      });

       it('user get', function() {
        UserActions.getUser(userId,fakeToken);
        expect(BaseActions.get.withArgs(
          `/api/users/` + userId,
          AppConstants.USER_GET,
          fakeToken
        ).called).to.eql(true);
      });

       it('users get', function() {
        UserActions.getUsers(fakeToken);
        expect(BaseActions.get.withArgs(
          `/api/users`,
          AppConstants.USERS_GET,
          fakeToken
        ).called).to.eql(true);
      });
    });
  });
})();