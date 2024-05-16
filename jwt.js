const jsonwebtoken = require('jsonwebtoken');

const jwt = jsonwebtoken.sign(
  {
    foo: 'bar'
  },
  'MY_SUPER_STRONG_PASSWORD',
  {
    expiresIn: 3600
  }
);
console.log(jwt);

const result = jsonwebtoken.verify(
  jwt,
  'MY_SUPER_STRONG_PASSWORD'
);

console.log(result);

