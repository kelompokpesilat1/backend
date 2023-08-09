/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
const login = require('./login');
const register = require('./register');
const verifyJwtToken = require('./verifyJwtToken');
const status = require('./status');

module.exports = {
  login,
  register,
  verifyJwtToken,
  status,
};
