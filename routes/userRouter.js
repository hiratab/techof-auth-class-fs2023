const express = require('express');
const { createUser, authenticateUser } = require('../services/userService');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { body } = req;

    const newUser = await createUser(body);
    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      data: error
    });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { body } = req;

    const user = await authenticateUser(body);
    res.status(201).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      data: error
    });
  }
});

module.exports = userRouter;
