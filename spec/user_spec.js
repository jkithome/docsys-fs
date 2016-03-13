(function() {
  'use strict';
  var supertest = require('supertest');
  var userId, token, sessionToken, sessionId;
  // var userHelper = require('../helpers/usersHelper');
  var app = require('../index.js');
  var request = supertest(app);
  // var roleHelper = require('../helpers/rolesHelper');

  describe('User spec', function() {
    // beforeEach(function(done) {
    //   userHelper.seedUsers(done);
    // });

    describe('Tests for Users', function() {
      it('should create a new user', function(done) {
        request
          .post('/api/users/create')
          .send({
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

      it('should create a user if role isn\'t provided', function(done) {
        request
          .post('/api/users/create')
          .send({
            username: 'Jinchuruki',
            firstname: 'Naruto',
            lastname: 'Uzumaki',
            email: 'joker@konoha.com',
            password: 'password'
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
          .post('/api/users/create')
          .send({
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
          .post('/api/users/create')
          .send({
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
          .post('/api/users/create')
          .send({
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
          .post('/api/users/create')
          .send({
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
          .post('/api/users/login')
          .send({
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

      it('Should return correct response for wrong password', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Tester',
            password: 'password1'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.error).toBe('Wrong password.');
            expect(res.body.token).toBeUndefined();
            done();
          });
      });

      it('Returns correct response for log in if user doesn\'t exist', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Thor',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.error).toBe('User not found.');
            expect(res.body.token).toBeUndefined();
            done();
          });
      });

      it('Should return all the users', function(done) {
        request
          .get('/api/users')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.length).toBe(6);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body instanceof Array).toBe(true);
            done();
          });
      });

      it('Should return the specified user', function(done) {
        request
          .get('/api/users/' + userId)
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

      it('Should fail to return user for invalid ID', function(done) {
        request
          .get('/api/users/123')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.body.error).toBe('Error fetching user.');
            done();
          });
      });

      it('User has role defined', function(done) {
        request
          .get('/api/users/' + userId)
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
          .get('/api/users/' + userId)
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
          .put('/api/users/' + userId)
          .set('x-access-token', token)
          .send({
            username: 'updated',
            firstname: 'sasuke',
            lastname: 'uchiha',
            password: '12345',
            email: 'testing2@api.com'
          })
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User updated succesfully.');
            done();
          });
      });

      it('Should not update if user is non-existent', function(done) {
        request
          .put('/api/users/123')
          .set('x-access-token', token)
          .send({
            email: 'updated@api.com'
          })
          .end(function(err, res) {
            expect(res.status).toEqual(500);
            expect(res.body.name).toBe('CastError');
            expect(res.body.message).toContain('123');
            expect(res.body.kind).toBe('ObjectId');
            done();
          });
      });

      it('Should throw error if updated field is duplicate', function(done) {
        request
          .put('/api/users/' + userId)
          .send({
            email: 'this@that.com'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(409 || 500);
            expect(res.body.code).toBe(11000 || 11001);
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('this@that.com');
            done();
          });
      });


      it('Should delete the specified user', function(done) {
        request
          .delete('/api/users/' + userId)
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User deleted successfully.');
            done();
          });
      });

      it('Fails to delete non-existent user', function(done) {
        request
          .delete('/api/users/123')
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

      it('should confirm that the user was deleted', function(done) {
        request
          .get('/api/users')
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

      it('Fails to logout non-existent user', function(done) {
        request
          .put('/api/users/logout/123')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.body.error).toBe('Error fetching user.');
            done();
          });
      });

      it('Logs out user successfully', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var id = res.body.user._id;
            request
              .put('/api/users/logout/' + id)
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('User logged out succesfully.');
                done();
              });
          });
      });

      it('Returns correct response for valid session', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            sessionToken = res.body.token;
            sessionId = res.body.user._id;
            request
              .get('/api/users/session')
              .set('x-access-token', sessionToken)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.loggedIn).toBe(true);
                done();
              });
          });
      });

      it('Returns correct response for valid session', function(done) {
        request
          .put('/api/users/logout/' + sessionId)
          .set('x-access-token', sessionToken)
          .accept('application/json')
          .end(function(err, res) {
            request
              .get('/api/users/session')
              .set('x-access-token', sessionToken)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.loggedIn).toBe(false);
                done();
              });
          });
        });

    });
  });

})();

