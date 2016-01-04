var seeder = require('mongoose-seed');
var db = require('../../config');

// Data array containing seed data - documents organized by Model
var data = [{
  'model': 'User',
  'documents': [{
    username: 'Jemmy',
    name: {
      first: 'Jeremy',
      last: 'Kithome'
    },
    email: 'jerry@erry.com',
    password: 'password',
    role: 'user'
  }, {
    username: 'FutureCEO',
    name: {
      first: 'Jeremy',
      last: 'NotCeo'
    },
    email: 'ceo@ceo.com',
    password: 'password',
    role: 'staff'

  }, {
    username: 'Terminator',
    name: {
      first: 'Big',
      last: 'Muscles'
    },
    email: 'robot@skynet.com',
    password: 'password',
    role: 'admin'
  }, {
    username: 'ExtraGuy',
    name: {
      first: 'Make',
      last: 'Sure'
    },
    email: 'this@that.com',
    password: 'password',
    role: 'admin'
  }]
}];

// Connect to MongoDB via Mongoose
seeder.connect(db.database, function() {

  // Load Mongoose models
  seeder.loadModels([
    './server/models/users.js',
    './server/models/roles.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data);

  });
});
