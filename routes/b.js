const bcrypt = require('bcrypt');

const myFunction = async () => {
  const saltRounds = 10;
  const myPlaintextPassword = 's0/\/\P4$$w0rD';
  const someOtherPlaintextPassword = 'not_bacon';

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(someOtherPlaintextPassword, salt);
  console.log(`Password ${someOtherPlaintextPassword} Hash ${hash} Salt ${salt}`);

  const result = await bcrypt.compare('not_bacon', hash);
  console.log('result', result);
}

myFunction().catch(console.log);