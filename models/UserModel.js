const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Provide an email'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minLength: 6
  },
  firstName: String,
  lastName: String,
  created: Date,
  modified: Date,
  permissions: {}
});

UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }

  return next();
});

module.exports = mongoose.model('User', UserSchema, 'user');
