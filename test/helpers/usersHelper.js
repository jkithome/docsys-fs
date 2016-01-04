(function() {
  'use strict';
  var request = require('superagent');
  var User1 = {
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

  module.exports = {
    seedUsers: function(next) {
      request
        .post('http://localhost:8080/api/users/create', User1)
        .accept('application/json')
        .end();

      request
        .post('http://localhost:8080/api/users/create', user2)
        .accept('application/json')
        .end();

      request
        .post('http://localhost:8080/api/users/create', user3)
        .accept('application/json')
        .end();

      request
        .post('http://localhost:8080/api/users/create', user4)
        .accept('application/json')
        .end();

      next();
    }
  };

})();
