const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema, 'user');
