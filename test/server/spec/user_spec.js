(function() {
  'use strict';
  var request = require('superagent');
  var userId, token;
  var userHelper = require('../helpers/usersHelper');
  var roleHelper = require('../helpers/rolesHelper');

  describe('User spec', function() {
    beforeEach(function(done) {
      userHelper.seedUsers(done);
    });

    describe('Tests for Users', function() {
      it('should create a new user', function(done) {
        request
          .post('http://localhost:8080/api/users/create', {
            username: 'Tester',
            firstname: 'Tests',
            lastname: 'Passed',
            email: 'testing@api.com',
            password: 'password',
            role: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User created successfully.');
            done();
          });
      });

      it('should not create a user with duplicate username', function(done) {
        request
          .post('http://localhost:8080/api/users/create', {
            username: 'Tester',
            firstname: 'Tests',
            lastname: 'Passed',
            email: 'testingmail@api.com',
            password: 'password',
            role: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toBe(409);
            expect(res.body.code).toEqual(11000);
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('Tester');
            done();
          });
      });

      it('Username is required to create user', function(done) {
        request
          .post('http://localhost:8080/api/users/create', {
            firstname: 'first',
            lastname: 'last',
            email: 'email@email.com',
            password: 'password',
            role: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(400);
            expect(res.body.message).toBe('User validation failed');
            expect(res.body.name).toBe('ValidationError');
            done();
          });
      });

      it('Email is required to create user', function(done) {
        request
          .post('http://localhost:8080/api/users/create', {
            username: 'username',
            firstname: 'first',
            lastname: 'last',
            password: 'password',
            role: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(400);
            expect(res.body.message).toBe('User validation failed');
            expect(res.body.name).toBe('ValidationError');
            done();
          });
      });

      it('should not create a user with duplicate email', function(done) {
        request
          .post('http://localhost:8080/api/users/create', {
            username: 'Tester2',
            firstname: 'Tests',
            lastname: 'Passed',
            email: 'testing@api.com',
            password: 'password',
            role: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toBe(409);
            expect(res.body.code).toEqual(11000);
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('testing@api.com');
            done();
          });
      });

      it('Should return that the user successfully logged in', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Tester',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            userId = res.body.user._id;
            token = res.body.token;
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User successfully logged in.');
            expect(res.body.token).toBeDefined();
            done();
          });
      });

      it('Should return all the users', function(done) {
        request
          .get('http://localhost:8080/api/users')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.length).toBe(5);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body instanceof Array).toBe(true);
            done();
          });
      });

      it('Should return the specified user', function(done) {
        request
          .get('http://localhost:8080/api/users/' + userId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.password).toBeUndefined();
            expect(res.body.email).toBeDefined();
            expect(res.body.username).toBeDefined();
            expect(res.body.name instanceof Object).toBe(true);
            done();
          });
      });

      it('User has role defined', function(done) {
        request
          .get('http://localhost:8080/api/users/' + userId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.role).toBeDefined();
            expect(res.body.role instanceof Object).toBe(true);
            done();
          });
      });

      it('User has first and last names defined', function(done) {
        request
          .get('http://localhost:8080/api/users/' + userId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.name.first).toBeDefined();
            expect(typeof res.body.name.first).toBe('string');
            expect(res.body.name.last).toBeDefined();
            expect(typeof res.body.name.last).toBe('string');
            done();
          });
      });

      it('Should update the specified user', function(done) {
        request
          .put('http://localhost:8080/api/users/' + userId)
          .set('x-access-token', token)
          .send({
            email: 'testing2@api.com'
          })
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User updated succesfully.');
            done();
          });
      });

      it('Should delete the specified user', function(done) {
        request
          .delete('http://localhost:8080/api/users/' + userId)
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User deleted successfully.');
            done();
          });
      });

      it('should confirm that the user was deleted', function(done) {
        request
          .get('http://localhost:8080/api/users')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.length).toBe(4);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body instanceof Array).toBe(true);
            done();
          });
      });

    });
  });

})();
