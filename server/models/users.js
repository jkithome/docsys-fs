// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  timestamps: {

  }
}, {
  timestamps: true
});

UserSchema.pre('save', function(next) {
  var user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    next();
  }

  // Hash the password
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    } else {
      // Replace the cleartext password with the hashed one
      user.password = hash;
      next();
    }
  });
});

// Check if entered password is the same as the stored password
UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', UserSchema);
