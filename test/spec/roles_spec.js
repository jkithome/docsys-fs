(function() {
  'use strict';
  var request = require('superagent');
  var token, roleId;
  var userHelper = require('../helpers/usersHelper');

  describe('Roles spec', function() {
    beforeEach(function(done) {
      userHelper.seedUsers(done);
    });
    describe('Tests for roles', function() {
      it('User must be authenticated to create role', function(done) {
        request
          .post('http://localhost:8080/api/roles', {
            title: 'test',
            description: 'For testing only'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(403);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });

      it('New role has unique title', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            token = res.body.token;
            request
              .post('http://localhost:8080/api/roles', {
                title: 'user',
                description: 'user'
              })
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.code).toBe(11000);
                expect(res.body.errmsg).toBe('E11000 duplicate key error index: demoDb.roles.$title_1 dup key: { : \"user\" }');
                done();
              });
          });
      });

      it('Title is required', function(done) {
        request
          .post('http://localhost:8080/api/roles', {
            description: 'Should not work'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Role validation failed');
            expect(res.body.name).toBe('ValidationError');
            expect(res.body.errors.title.message).toBe('Path `title` is required.');
            done();
          });
      });

      it('Role is created', function(done) {
        request
          .post('http://localhost:8080/api/roles', {
            title: 'test',
            description: 'For testing only'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            roleId = res.body.the_role._id;
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Role created successfully.');
            expect(res.body.the_role.title).toBe('test');
            done();
          });
      });

      it('Fetches a role', function(done) {
        request
          .get('http://localhost:8080/api/roles' + roleId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.title).toBe('test');
            expect(res.body.description).toBe('For testing only');
            done();
          });
      });
    });
  });
})();
