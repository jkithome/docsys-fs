(function() {
  'use strict';
  var supertest = require('supertest');
  var token, roleId;
  // var userHelper = require('../helpers/usersHelper');
  var app = require('../index.js');
  var request = supertest(app);
  // var roleHelper = require('../helpers/rolesHelper');

  describe('Roles spec', function() {

    // beforeEach(function(done) {
    //   userHelper.seedUsers(done);
    // });

    describe('Tests for roles', function() {

      it('User must be authenticated to create role', function(done) {
        request
          .post('/api/roles')
          .send({
            title: 'test',
            description: 'For testing only'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });

      it('New role has unique title', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            token = res.body.token;
            request
              .post('/api/roles')
              .set('x-access-token', token)
              .send({
                title: 'user',
                description: 'user'
              })
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(409);
                expect(res.body.code).toBe(11000);
                expect(res.body.errmsg).toContain('duplicate key');
                expect(res.body.errmsg).toContain('user');
                done();
              });
          });
      });

      it('Title is required', function(done) {
        request
          .post('/api/roles')
          .set('x-access-token', token)
          .send({
            description: 'Should not work'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(400);
            expect(res.body.message).toBe('Role validation failed');
            expect(res.body.name).toBe('ValidationError');
            expect(res.body.errors.title.message).toBe('Path `title` is required.');
            done();
          });
      });

      it('Role is created', function(done) {
        request
          .post('/api/roles')
          .set('x-access-token', token)
          .send({
            title: 'test',
            description: 'For testing only'
          })
          .accept('application/json')
          .end(function(err, res) {
            roleId = res.body.the_role._id;
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Role created successfully.');
            expect(res.body.the_role.title).toBe('test');
            done();
          });
      });

      it('All roles are returned', function(done) {
        request
          .get('/api/roles')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body instanceof Array).toBe(true);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body.length).toBe(4);
            done();
          });
      });

      it('Fetches a role', function(done) {
        request
          .get('/api/roles/' + roleId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.title).toBe('test');
            expect(res.body.description).toBe('For testing only');
            done();
          });
      });

      it('Fails to fetch non-existent role', function(done) {
        request
          .get('/api/roles/436528udsaghf')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Error fetching role.');
            done();
          });
      });

      it('Role is updated', function(done) {
        request
          .put('/api/roles/' + roleId)
          .set('x-access-token', token)
          .send({
            description: 'Role can be updated'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Role updated successfully.');
            done();
          });
      });

      it('Fails to update non-existent role', function(done) {
        request
          .put('/api/roles/123')
          .set('x-access-token', token)
          .send({
            description: 'Role can be updated'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(500);
            expect(res.body.name).toBe('CastError');
            expect(res.body.message).toContain('123');
            expect(res.body.kind).toBe('ObjectId');
            done();
          });
      });

      it('Role won\'t update if a unique field is duplicate', function(done) {
        request
          .put('/api/roles/' + roleId)
          .send({
            title: 'user'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(409);
            expect(res.body.code).toBe(11000);
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('user');
            done();
          });
      });

      it('Role won\'t update if title is not allowed', function(done) {
        request
          .put('/api/roles/' + roleId)
          .send({
            title: 'avengers'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(400);
            expect(res.body.message).toBe('Role validation failed');
            expect(res.body.errors.title.message).toBe('`avengers` is not a valid enum value for path `title`.');
            done();
          });
      });

      it('Role is deleted', function(done) {
        request
          .delete('/api/roles/' + roleId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Role deleted successfully.');
            done();
          });
      });

      it('Fails to delete non-existent role', function(done) {
        request
          .delete('/api/roles/123')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(500);
            expect(res.body.name).toBe('CastError');
            expect(res.body.message).toContain('123');
            expect(res.body.kind).toBe('ObjectId');
            done();
          });
      });
    });
  });
})();
