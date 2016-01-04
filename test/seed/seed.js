var seeder = require('mongoose-seed');
var db = require('../../config');

// Data array containing seed data - documents organized by Model
var data = [{
  'model': 'Role',
  'documents': [{
    title: 'user'
  }, {
    title: 'staff'
  }, {
    title: 'admin'
  }]
}];

// Connect to MongoDB via Mongoose
seeder.connect(db.database, function() {

  // Load Mongoose models
  seeder.loadModels([
    './server/models/roles.js',
    './server/models/users.js',
    './server/models/documents.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['Role', 'User', 'Document'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data);

  });
});
