const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { MONGODB_CONNECTION_URI } = process.env;

const createUser = async (user) => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);

    const newUser = new UserModel(user);
    return await newUser.save();
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}

const authenticateUser = async ({
  email,
  password
}) => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);

    const user = await UserModel.findOne({
      email
    });

    const result = await bcrypt.compare(password, user.password);
    console.log('result', result);

    if (!result) {
      throw new Error();
    }

    return jsonwebtoken.sign(
      {
        userId: user._id,
        email: user.email,
        permissions: user.permissions
      },
      'MY_SUPER_STRONG_PASSWORD',
      {
        expiresIn: 3600
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}

module.exports = {
  createUser,
  authenticateUser,
}
