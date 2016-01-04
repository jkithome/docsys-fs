(function() {
  'use strict';
  var request = require('superagent');
  var documentId, token;
  var userHelper = require('../helpers/usersHelper');
  var documentsHelper = require('../helpers/documentsHelper');
  var helper = require('../helpers/helpers');

  describe('Document spec', function() {
    beforeEach(function(done) {
      userHelper.seedUsers(done);
    });

    describe('Tests for documents', function() {

      it('Documents cannot be created unless logged in', function(done) {
        request
          .post('http://localhost:8080/api/documents', {
            title: 'Andela',
            content: 'Journey to D4',
            access: 'user,admin',
            genre: 'Inspiration'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(403);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });

      it('Documents are created', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            token = res.body.token;
            request
              .post('http://localhost:8080/api/documents', {
                title: 'The Matrix',
                genre: 'Science fiction',
                content: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                access: 'user'
              })
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                documentId = res.body.doc._id;
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document created successfully.');
                expect(res.body.doc.title).toBe('The Matrix');
                done();
              });
          });
      });

      it('Should return a particular document', function(done) {
        request
          .get('http://localhost:8080/api/documents/' + documentId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body)).toBe("[object Object]");
            expect(res.body.title).toBe('The Matrix');
            done();
          });
      });

      it('Users not allowed access can\'t view the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .get('http://localhost:8080/api/documents/' + documentId)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(Object.prototype.toString.call(res.body)).toBe("[object Object]");
                expect(res.body.message).toBe('You are not allowed to access this document!');
                done();
              });
          });
      });

      it('Should update a particular document', function(done) {
        request
          .put('http://localhost:8080/api/documents/' + documentId, {
            title: 'The Matrix Reloaded'
          })
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Document updated successfully.');
            done();
          });
      });

      it('Users not allowed access can\'t update the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('http://localhost:8080/api/documents/' + documentId, {
                title: 'The Matrix Reloaded'
              })
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('You are not allowed to update this document!');
                done();
              });
          });
      });

      it('Users not allowed access can\'t delete the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('http://localhost:8080/api/documents/' + documentId)
              .set('x-access-token', tokenator)
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('Should delete a particular document', function(done) {
        request
          .delete('http://localhost:8080/api/documents/' + documentId)
          .set('x-access-token', token)
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Document deleted successfully.');
            done();
          });
      });
    });
  });
})();
