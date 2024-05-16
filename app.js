const express = require('express');

require('dotenv').config();
const { PORT } = process.env;

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});