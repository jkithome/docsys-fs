(function() {
  'use strict';
  var supertest = require('supertest');
  var app = require('../index.js');
  var request = supertest(app);
  var user1 = {
    username: 'Jemmy',
    firstname: 'Jeremy',
    lastname: 'Kithome',
    email: 'jerry@erry.com',
    password: 'password',
    role: 'user'
  };
  var user2 = {
    username: 'FutureCEO',
    firstname: 'Jeremy',
    lastname: 'NotCeo',
    email: 'ceo@ceo.com',
    password: 'password',
    role: 'staff'

  };
  var user3 = {
    username: 'Terminator',
    firstname: 'Big',
    lastname: 'Muscles',
    email: 'robot@skynet.com',
    password: 'password',
    role: 'admin'
  };

  var user4 = {
    username: 'ExtraGuy',
    firstname: 'Make',
    lastname: 'Sure',
    email: 'this@that.com',
    password: 'password',
    role: 'admin'
  };

  request
    .post('/api/users/create')
    .send(user1)
    .accept('application/json')
    .end();

  request
    .post('/api/users/create')
    .send(user2)
    .accept('application/json')
    .end();

  request
    .post('/api/users/create')
    .send(user3)
    .accept('application/json')
    .end();

  request
    .post('/api/users/create')
    .send(user4)
    .accept('application/json')
    .end();
})();
