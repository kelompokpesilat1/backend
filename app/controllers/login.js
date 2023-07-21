/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { createToken } = require('../helper/jwt');

const login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res.send({
        status: 'success',
        message: 'user tidak ditemukan',
      });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        id: req.body.email,
        message: 'Error',
        errors: 'Invalid Password!',
      });
    }
    const payload = {
      id: data.id,
    };
    res.status(200).json({
      access_token: createToken(payload),
    });
  });
};

module.exports = { login };
