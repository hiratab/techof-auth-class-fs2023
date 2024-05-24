const express = require('express');
const {
  createUser,
  authenticateUser,
  forgotPassword,
  resetPassword,
  deactivateUser,
} = require('../services/userService');

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
      data: error.message
    });
  }
});

userRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    await forgotPassword({ email });
    res.status(201).send();
  } catch (error) {
    res.status(400).send('Error while sending email');
  }
});

userRouter.post('/reset-password', async (req, res) => {
  try {
    const { email, token, password } = req.body;

    await resetPassword({ email, token, password });
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send('Error while changing password');
  }
});

userRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send('No User ID');
  }

  await deactivateUser({ userId });
  return res.send({
    status: 'success',
    data: {}
  });
});

module.exports = userRouter;
