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

module.exports = { getUsers, getUserById, getUserByRoles };
