// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose model and export it
module.exports = mongoose.model('Document', new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  content: String,

  access: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}));
