require('dotenv').config();

module.exports = {
  secret: process.env.SECRET || '123456',
  ROLEs: ['USER', 'ADMIN', 'CC'],
};
