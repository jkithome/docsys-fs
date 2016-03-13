(function() {
  'use strict';
  var supertest = require('supertest');
  var userId, token, sessionToken, sessionId;
  var app = require('../index.js');
  var request = supertest(app);

  describe('auth spec', function() {
    it('Return correct response if there is no token', function(done) {
      request
          .get('/api/documents/123')
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
    });
    it('Return correct response if token is invalid', function(done) {
      request
          .get('/api/documents/123')
          .set('x-access-token', 'blahblah')
          .accept('application/json')
          .end(function(err, res) {
            expect(res.body.message).toBe('Failed to authenticate token.');
            done();
          });
    });
  });
})();