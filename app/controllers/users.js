/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const { User } = require('../models');
const { Roles } = require('../models');
const { Article } = require('../models');

const getUsers = (req, res) => {
  User.findAll().then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const getUserById = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      Article.findAll({
        where: {
          id_user: user.id,
        },
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil menampilkan data',
          user: {
            user: {
              name: user.name,
              email: user.email,
              foto: user.foto,
              article: data,
            },
          },
        });
      }).catch((err) => {
        res.status(500).send({
          message: 'Error',
          errors: err.message,
        });
      });
    }).catch((err) => {
      res.status(500).send({
        message: 'Error',
        errors: err.message,
      });
    });
};

const getUserByRoles = (req, res) => {
  Roles.findByPk(req.params.id)
    .then((role) => {
      if (!role) {
        return res.send({
          status: 'failed',
          message: 'maaf roles yang anda cari tidak ada',
        });
      }
      User.findAll({
        where: {
          id_roles: role.id,
        },
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil menampilkan data',
          data,
        });
      }).catch((err) => {
        res.status(500).send({
          message: 'Error',
          errors: err.message,
        });
      });
    }).catch((err) => {
      res.status(500).send({
        message: 'Error',
        errors: err.message,
      });
    });
};

// test

const createUser = async (req, res) => {
  const name = `${req.body.first_name} ${req.body.last_name}`;
  const {
    email, password, confPassword, phone_number,
  } = req.body;
  const role = 'user';
  if (password !== confPassword) return res.status(400).json({ msg: 'Password Dan Confirm Password Tidak Sesuai' });
  const isEmailTaken = await Users.findOne({
    where: {
      email,
    },
  });
  if (isEmailTaken) return res.status(400).json({ msg: 'Email Ini Sudah Terdaftar' });
  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
      phone_number,
      role,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }

  const updateUser = async (req, res) => {
    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: 'User Tidak Di Temukan' });
    let name = `${req.body.first_name} ${req.body.last_name}`;
    if (req.body.first_name === undefined && req.body.last_name === undefined) {
      name = req.name;
    }
    const { password, confPassword, phone_number } = req.body;

    let hashPassword;
    if (password === '' || password === null) {
      hashPassword = user.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: 'Password Dan Confirm Password Tidak Sesuai' });

    let { email } = req.body;
    if (email === '' || email === null) {
      email = user.email;
    } else {
      // eslint-disable-next-line no-shadow
      const isEmailTaken = await Users.findOne({
        where: {
          email,
        },
      });
      if (user.email !== email) {
        if (isEmailTaken) return res.status(400).json({ msg: 'Email Ini Sudah Terdaftar' });
      }
    }

    try {
      await Users.update(
        {
          name,
          email,
          password: hashPassword,
          phone_number,
        },
        {
          where: {
            id: user.id,
          },
        },
      );
      res.status(200).json({ msg: 'User Updated' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
};
module.exports = { getUsers, getUserById, getUserByRoles };
