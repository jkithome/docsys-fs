// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose model and export it
module.exports = mongoose.model('Role', new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    default: 'user',
    // Allowed roles
    enum: ['admin', 'staff', 'user', 'test']
  },
  description: String
}));
