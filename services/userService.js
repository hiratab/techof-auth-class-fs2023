const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
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

    return user;
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
