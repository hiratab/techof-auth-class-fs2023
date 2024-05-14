const express = require('express');

require('dotenv').config();
const { PORT } = process.env;

const app = express();
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});