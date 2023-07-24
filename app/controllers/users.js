/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */

const { Op } = require('sequelize');
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

const editUserByAdmin = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    foto,
    id_roles,
  } = req.body;
  User.findByPk(id)
    .then((user) => {
      user.update({
        name,
        email,
        password,
        foto,
        id_roles,
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil mengupdate data',
          category: {
            data,
          },
        });
      }).catch((err) => {
        res.status(500).send({
          message: 'gagal mengupdate data',
          errors: err.message,
        });
      });
    }).catch((err) => {
      res.status(500).send({
        message: 'user tidak ditemukan',
        errors: err.message,
      });
    });
};

const deleteUserByAdmin = (req, res) => {
  const { userId } = req.body;
  User.destroy({
    where: {
      id: userId,
    },
  }).then((data) => {
    res.status(200).send({
      status: 'success',
      message: 'berhasil menghapus user',
      data,
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Error',
      errors: err.message,
    });
  });
};

const editUserByUser = (req, res) => {
  const {
    name,
    password,
    foto,
  } = req.body;
  User.findByPk(req.userId)
    .then((user) => {
      user.update({
        name,
        password,
        foto,
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil mengupdate data',
          category: {
            data,
          },
        });
      }).catch((err) => {
        res.status(500).send({
          message: 'gagal mengupdate data',
          errors: err.message,
        });
      });
    }).catch((err) => {
      res.status(500).send({
        message: 'user tidak ditemukan',
        errors: err.message,
      });
    });
};

const deleteUserByUser = (req, res) => {
  User.destroy({
    where: {
      id: req.userId,
    },
  }).then((data) => {
    res.status(200).send({
      status: 'success',
      message: 'berhasil menghapus user',
      data,
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Error',
      errors: err.message,
    });
  });
};

const searchUser = (req, res) => {
  const searchQuery = req.params.q;
  User.findAll({
    where: {
      name: {
        [Op.like]: `%${searchQuery}%`,
      },
    },
  }).then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

module.exports = {
  getUsers,
  getUserById,
  getUserByRoles,
  editUserByAdmin,
  deleteUserByAdmin,
  editUserByUser,
  deleteUserByUser,
  searchUser,
};
