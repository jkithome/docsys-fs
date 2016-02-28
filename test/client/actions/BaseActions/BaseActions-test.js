(function() {
  'use strict';

  var sinon =require('sinon');
  var expect = require('chai').expect;
  var request =require('superagent');
  var AppDispatcher =require('../../../../app/scripts/dispatcher/AppDispatcher');
  var BaseActions =require('../../../../app/scripts/actions/BaseActions');

  describe('BaseActions', function() {
    var fakeToken = 'token';
    let fakeActionType = 'FAKE_IT';
    let response = {
      body: 'response',
      statusCode: 400
    };
    let fakeURL = '/api/testing';

    before(function() {
      sinon.stub(AppDispatcher, 'dispatch').returns(true);
      sinon.stub(request.Request.prototype, 'end', function(cb) {
        cb(null, response);
      });
    });

    after(function() {
      AppDispatcher.dispatch.restore();
      request.Request.prototype.end.restore();
    });

    describe('HTTP methods', function() {
      it('delete', function() {
        BaseActions.delete(fakeURL, fakeActionType, fakeToken);
        expect(AppDispatcher.dispatch.withArgs(
          {
            actionType: fakeActionType,
            data: response.body
          }
        ).called).to.eql(true);
      });

      it('get', function() {
        BaseActions.get(fakeURL, fakeActionType, fakeToken);
        expect(AppDispatcher.dispatch.withArgs(
          {
            actionType: fakeActionType,
            data: response.body
          }
        ).called).to.eql(true);
      });

      it('post', function() {
        BaseActions.post(fakeURL, response, fakeActionType, fakeToken);
        expect(AppDispatcher.dispatch.withArgs(
          {
            actionType: fakeActionType,
            data: response.body
          }
        ).called).to.eql(true);
      });

      it('put', function() {
        BaseActions.put(fakeURL, response, fakeActionType, fakeToken);
        expect(AppDispatcher.dispatch.withArgs(
          {
            actionType: fakeActionType,
            data: response.body
          }
        ).called).to.eql(true);
      });

    });
  });
})();