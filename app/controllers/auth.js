/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
const argon2 = require('argon2');
// eslint-disable-next-line import/no-unresolved
const Users = require('../models/Users.js');
// eslint-disable-next-line import/no-unresolved
const { createToken } = require('../helpers/jwt.js');

// eslint-disable-next-line consistent-return
const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: 'User Tidak Di Temukan' });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: 'Password Yang Anda Masukan Salah' });
  const payload = {
    id: user.id,
  };
  res.status(200).json({
    access_token: createToken(payload),
  });
};

module.exports = Login;
