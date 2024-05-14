const express = require('express');

require('dotenv').config();
const { PORT } = process.env;

const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});