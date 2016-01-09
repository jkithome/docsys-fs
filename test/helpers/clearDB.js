(function() {
  'use strict';
  var config = require('../../config');
  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert');
  var ObjectId = require('mongodb').ObjectID;
  var url = config.database;

  var dropRoles = function(db, callback) {
    db.collection('roles').drop(function(err, response) {
      console.log(response);
      callback();
    });
  };

  var dropUsers = function(db, callback) {
    db.collection('users').drop(function(err, response) {
      console.log(response);
      callback();
    });
  };

  var dropDocuments = function(db, callback) {
    db.collection('documents').drop(function(err, response) {
      console.log(response);
      callback();
    });
  };


  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    dropRoles(db, function() {});

    dropUsers(db, function() {});

    dropDocuments(db, function() {
      db.close();
    });

  });

})();
