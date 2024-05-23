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
  permissions: Array,
  resetPasswordToken: String,
});

UserSchema.methods = {
  authenticate: async function(plainTextPassword) {
    const result = await bcrypt.compare(plainTextPassword, this.password);
    if (!result) {
      throw new Error('Password does not match');
    }
  },
  generateResetPasswordToken: function() {
    this.resetPasswordToken = Math.round(Math.random() * 100000);
  },
  resetPassword: async function(token, password) {
    const result = await bcrypt.compare(token, this.resetPasswordToken);
    if (!result) {
      throw new Error('Token does not match');
    }

    this.password = password;
    this.resetPasswordToken = null;
  }
};

UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  
  if (this.resetPasswordToken && this.isModified('resetPasswordToken')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.resetPasswordToken, salt);
    this.resetPasswordToken = hash;
  }

  return next();
});

module.exports = mongoose.model('User', UserSchema, 'user');
