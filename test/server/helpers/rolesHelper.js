(function() {
  'use strict';
  var config = require('../../../config');
  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert');
  var ObjectId = require('mongodb').ObjectID;
  var url = config.database;


  var data = [{
    title: 'user',
    description: 'Can create and view documents'
  }, {
    title: 'staff',
    description: 'Can create, view and edit documents'
  }, {
    title: 'admin',
    description: 'Can create, view, edit and delete documents'
  }];

  var insertDocument = function(db, callback) {
    db.collection('roles').insertMany(data, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the roles collection.');
      callback(result);
    });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    insertDocument(db, function() {
      db.close();
    });
  });

})();
