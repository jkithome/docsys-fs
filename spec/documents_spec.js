(function() {
  'use strict';
  var supertest = require('supertest');
  var documentId, documentIdB, token, tokenB, userId;
  var userHelper = require('./usersHelper');
  var app = require('../index.js');
  var request = supertest(app)
  // var roleHelper = require('../helpers/rolesHelper');

  describe('Document spec', function() {
    // beforeAll(function(done) {
    //   userHelper.seedUsers(done);
    // });

    describe('Tests for documents', function() {

      it('Documents cannot be created unless logged in', function(done) {
        request
          .post('/api/documents')
          .send({
            title: 'Andela',
            content: 'Journey to D4',
            access: 'user,admin',
            genre: 'Inspiration'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });

      it('Documents are created', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            token = res.body.token;
            userId = res.body.user._id;
            request
              .post('/api/documents')
              .set('x-access-token', token)
              .send({
                title: 'The Matrix',
                genre: 'Science fiction',
                content: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                access: 'user'
              })
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

      it('Documents cannot be created with none existent roles', function(done) {
        request
          .post('/api/documents', {
            title: 'Avengers',
            content: 'Avengers unite',
            access: 'dude',
            genre: 'Inspiration'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });

      it('Documents must have a title', function(done) {
        request
          .post('/api/documents')
          .set('x-access-token', token)
          .send({
            genre: 'Action',
            content: 'A new theme park is built on the original site of Jurassic Park. Everything is going well until the park\'s newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.',
            access: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(400);
            expect(res.body.message).toBe('Document validation failed');
            expect(res.body.errors.title.message).toBe('Path `title` is required.');
            done();
          });
      });

      it('Document should have unique title', function(done) {
        request
          .post('/api/documents')
          .set('x-access-token', token)
          .send({
            title: 'The Matrix',
            genre: 'Action',
            content: 'A new theme park is built on the original site of Jurassic Park. Everything is going well until the park\'s newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.',
            access: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(409);
            expect(res.body.code).toEqual(11000);
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('The Matrix');
            done();
          });
      });

      it('Document has owner', function(done) {
        request
          .post('/api/documents')
          .set('x-access-token', token)
          .send({
            title: 'The Hunger Games',
            genre: 'Science fiction',
            content: 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games, a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Document created successfully.');
            expect(res.body.doc.owner).toBeDefined();
            done();
          });
      });

      it('Document has roles that can access it defined', function(done) {
        request
          .post('/api/documents')
          .set('x-access-token', token)
          .send({
            title: 'Star Wars: The Force Awakens',
            genre: 'Fantasy',
            content: '30 years after the defeat of the Galactic Empire, a new threat rises. The First Order attempts to rule the galaxy and only a ragtag group of Heroes can stop them, along with the help of the Resistance.'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Document created successfully.');
            expect(res.body.doc.access).toBeDefined();
            done();
          });
      });

      it('Document has date of creation', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'ExtraGuy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            tokenB = res.body.token;
            request
              .post('/api/documents')
              .set('x-access-token', tokenB)
              .send({
                title: 'The Martian',
                genre: 'Adventure',
                content: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.'
              })
              .accept('application/json')
              .end(function(err, res) {
                documentIdB = res.body.doc._id;
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document created successfully.');
                expect(res.body.doc.createdAt).toBeDefined();
                done();
              });
          });
      });

      it('All documents are returned in order of creation', function(done) {
        request
          .get('/api/documents?limit=0')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body[0].title).toBe('The Matrix');
            done();
          });
      });

      it('All Documents returned can be limited to specific number', function(done) {
        request
          .get('/api/documents?limit=2')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.length).toBeLessThan(3);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body[0].title).toBe('The Matrix');
            done();
          });
      });

      it('Documents created on a specific day are returned', function(done) {
        var day = new Date();
        var date = day.getDate();
        var month = day.getMonth() + 1;
        var year = day.getFullYear();
        request
          .get('/api/documents?year=' + year + '&month=' + month + '&date=' + date)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBe(4);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            done();
          });
      });

      it('Documents accessible by a given role are returned', function(done) {
        request
          .get('/api/documents?role=user&limit=0')
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

      it('Documents can be searched by genre', function(done) {
        request
          .get('/api/documents/?genre=science fiction')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body instanceof Array).toBe(true);
            expect(res.body[0].genre).toBe('Science fiction');
            done();
          });
      });

      it('Documents can be searched by content', function(done) {
        request
          .get('/api/documents?search=hacker')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body[0])).toBe('[object Object]');
            expect(res.body instanceof Array).toBe(true);
            expect(res.body[0].title).toBe('The Matrix');
            done();
          });
      });

      it('Should return all documents created by a user', function(done) {
        request
          .get('/api/users/' + userId + '/' + 'mydocuments')
          .set('x-access-token', token)
          .accept('application./json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBe(3);
            done();
          });
      });

      it('Should return all documents accessible by a user', function(done) {
        request
          .get('/api/users/' + userId + '/' + 'documents')
          .set('x-access-token', token)
          .accept('application./json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBe(4);
            done();
          });
      });

      it('Should return a particular document', function(done) {
        request
          .get('/api/documents/' + documentId)
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body)).toBe('[object Object]');
            expect(res.body.title).toBe('The Matrix');
            done();
          });
      });

      it('Users not allowed access can\'t view the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .get('/api/documents/' + documentId)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(Object.prototype.toString.call(res.body)).toBe('[object Object]');
                expect(res.body.message).toBe('You are not allowed to access this document!');
                done();
              });
          });
      });

      it('Should update a particular document', function(done) {
        request
          .put('/api/documents/' + documentId)
          .set('x-access-token', token)
          .send({
            title: 'The Matrix Reloaded',
            content: 'Neo fights',
            genre: 'Fighting',
            access: 'user'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('Document updated successfully.');
            done();
          });
      });

      it('Fails to update a document if a field is duplicate', function(done) {
        request
          .put('/api/documents/' + documentId)
          .set('x-access-token', token)
          .send({
            title: 'The Hunger Games'
          })
          .accept('application/json')
          .end(function(err, res) {
            expect(res.body.errmsg).toContain('duplicate key');
            expect(res.body.errmsg).toContain('The Hunger Games');
            done();
          });
      });

      it('User Roles not allowed access can\'t update the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('/api/documents/' + documentId, {
                title: 'The Matrix Reloaded'
              })
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(res.body.message).toBe('You are not allowed to update this document!');
                done();
              });
          });
      });

      it('User with User Role not document owner and allowed access can\'t update the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('/api/documents/' + documentIdB, {
                title: 'The Martian Jemmy'
              })
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(res.body.message).toBe('You are not allowed to update this document!');
                done();
              });
          });
      });

      it('User with Staff Role not owner and allowed access can update a particular document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'FutureCEO',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('/api/documents/' + documentIdB, {
                title: 'The Martian CEO'
              })
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document updated successfully.');
                done();
              });
          });
      });

      it('User with Admin Role not owner and allowed access can update a particular document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('/api/documents/' + documentIdB, {
                title: 'The Martian Terminator'
              })
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document updated successfully.');
                done();
              });
          });
      });

      it('User with User Role not document owner and allowed access can\'t delete the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('/api/documents/' + documentIdB)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('User with staff Role not document owner and allowed access can\'t delete the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'FutureCEO',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('/api/documents/' + documentIdB)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('User with Admin Role not owner and allowed access can delete the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('/api/documents/' + documentIdB)
              .set('x-access-token', tokenator)
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document deleted successfully.');
                done();
              });
          });
      });

      it('User Roles not allowed access can\'t delete the document', function(done) {
        request
          .post('/api/users/login')
          .send({
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('/api/documents/' + documentId)
              .set('x-access-token', tokenator)
              .end(function(err, res) {
                expect(res.status).toEqual(403);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('Should delete a particular document', function(done) {
        request
          .delete('/api/documents/' + documentId)
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
