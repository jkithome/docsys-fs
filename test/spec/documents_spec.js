(function() {
  'use strict';
  var request = require('superagent');
  var documentId, documentIdB, token, tokenB;
  var userHelper = require('../helpers/usersHelper');

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

      it('Documents must have a title', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            request
              .post('http://localhost:8080/api/documents', {
                genre: 'Action',
                content: 'A new theme park is built on the original site of Jurassic Park. Everything is going well until the park\'s newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.',
                access: 'user'
              })
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document validation failed');
                expect(res.body.errors.title.message).toBe('Path `title` is required.');
                done();
              });
          });
      });

      it('Document should have unique title', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            request
              .post('http://localhost:8080/api/documents', {
                title: 'The Matrix',
                genre: 'Action',
                content: 'A new theme park is built on the original site of Jurassic Park. Everything is going well until the park\'s newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.',
                access: 'user'
              })
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.code).toEqual(11000);
                expect(res.body.errmsg).toBe('E11000 duplicate key error index: demoDb.documents.$title_1 dup key: { : \"The Matrix\" }');
                done();
              });
          });
      });

      it('Document has owner', function(done) {
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
                title: 'The Hunger Games',
                genre: 'Science fiction',
                content: 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games, a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
              })
              .set('x-access-token', token)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('Document created successfully.');
                expect(res.body.doc.owner).toBeDefined();
                done();
              });
          });
      });

      it('Document has date of creation', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'ExtraGuy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            tokenB = res.body.token;
            request
              .post('http://localhost:8080/api/documents', {
                title: 'The Martian',
                genre: 'Adventure',
                content: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.',
              })
              .set('x-access-token', tokenB)
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
          .get('http://localhost:8080/api/documents/all/0')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(Object.prototype.toString.call(res.body[0])).toBe("[object Object]");
            expect(res.body[0].title).toBe('The Martian');
            done();
          });
      });

      it('All Documents returned can be limited to specific number', function(done) {
        request
          .get('http://localhost:8080/api/documents/all/2')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body instanceof Array).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.length).toBeLessThan(3);
            expect(Object.prototype.toString.call(res.body[0])).toBe("[object Object]");
            expect(res.body[0].title).toBe('The Martian');
            done();
          });
      });

      it('Documents can be searched by genre', function(done) {
        request
          .get('http://localhost:8080/api/documents/genre/science fiction')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body[0])).toBe("[object Object]");
            expect(res.body instanceof Array).toBe(true);
            expect(res.body[0].genre).toBe('Science fiction');
            done();
          });
      });

      it('Documents can be searched by content', function(done) {
        request
          .get('http://localhost:8080/api/documents/search/hacker')
          .set('x-access-token', token)
          .accept('application/json')
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(Object.prototype.toString.call(res.body[0])).toBe("[object Object]");
            expect(res.body instanceof Array).toBe(true);
            expect(res.body[0].title).toBe('The Matrix');
            done();
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

      it('User Roles not allowed access can\'t update the document', function(done) {
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

      it('User with User Role not document owner and allowed access can\'t update the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('http://localhost:8080/api/documents/' + documentIdB, {
                title: 'The Martian Jemmy'
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

      it('User with Staff Role not owner and allowed access can update a particular document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'FutureCEO',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('http://localhost:8080/api/documents/' + documentIdB, {
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
          .post('http://localhost:8080/api/users/login', {
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .put('http://localhost:8080/api/documents/' + documentIdB, {
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
          .post('http://localhost:8080/api/users/login', {
            username: 'Jemmy',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('http://localhost:8080/api/documents/' + documentIdB)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('User with staff Role not document owner and allowed access can\'t delete the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'FutureCEO',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('http://localhost:8080/api/documents/' + documentIdB)
              .set('x-access-token', tokenator)
              .accept('application/json')
              .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe('You are not allowed to delete this document!');
                done();
              });
          });
      });

      it('User with Admin Role not owner and allowed access can delete the document', function(done) {
        request
          .post('http://localhost:8080/api/users/login', {
            username: 'Terminator',
            password: 'password'
          })
          .accept('application/json')
          .end(function(err, res) {
            var tokenator = res.body.token;
            request
              .delete('http://localhost:8080/api/documents/' + documentIdB)
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
