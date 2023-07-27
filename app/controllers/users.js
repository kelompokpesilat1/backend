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
   User.findAll()
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const getUsersByAuth = (req, res) => {
   User.findByPk(req.userId)
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const getUserById = (req, res) => {
   User.findByPk(req.params.id, { include: Roles }).then((user) => {
      if (!user) {
         return res.send({
            status: 'failed',
            message: 'maaf user yang anda cari tidak ada'
         });
      }
      Article.findAll({
         where: {
            id_user: user.id
         }
      })
         .then((data) => {
            res.status(200).send({
               status: 'success',
               message: 'berhasil menampilkan data',
               data: {
                  user: {
                     roles: user.Role.name,
                     name: user.name,
                     email: user.email,
                     foto: user.foto,
                     article: data
                  }
               }
            });
         })
         .catch((err) => {
            res.status(500).send({
               message: 'Error',
               errors: err.message
            });
         });
   });
};

const getUserByRoles = (req, res) => {
   Roles.findByPk(req.params.id)
      .then((role) => {
         if (!role) {
            return res.send({
               status: 'failed',
               message: 'maaf roles yang anda cari tidak ada'
            });
         }
         User.findAll({
            where: {
               id_roles: role.id
            }
         })
            .then((data) => {
               res.status(200).send({
                  status: 'success',
                  message: 'berhasil menampilkan data',
                  data
               });
            })
            .catch((err) => {
               res.status(500).send({
                  message: 'Error',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
};

const editUserByAdmin = (req, res) => {
   const { id } = req.params;
   const { id_roles } = req.body;

   if (id_roles < 1 || id_roles > 3) {
      res.status(403).send({
         status: 'failed',
         message: 'Id roles tidak valid'
      });
      return;
   }

   User.findByPk(id)
      .then((user) => {
         user
            .update({
               id_roles
            })
            .then((data) => {
               res.status(200).send({
                  status: 'success',
                  message: 'berhasil mengupdate data',
                  category: {
                     data
                  }
               });
            })
            .catch((err) => {
               res.status(500).send({
                  message: 'gagal mengupdate data',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'user tidak ditemukan',
            errors: err.message
         });
      });
   return;
};

const deleteUserByAdmin = (req, res) => {
   const { userId } = req.body;
   User.destroy({
      where: {
         id: userId
      }
   })
      .then((data) => {
         res.status(200).send({
            status: 'success',
            message: 'berhasil menghapus user',
            data
         });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
};

const editUserByUser = (req, res) => {
   const { name, email, password } = req.body;

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   if (password) {
      if (!passwordRegex.test(req.body.password)) {
         res.status(401).send({
            status: 'failed',
            message: 'maaf password tidak valid'
         });
         return;
      }
   }
   if (email) {
      if (!emailRegex.test(email)) {
         res.status(401).send({
            status: 'failed',
            message: 'maaf email tidak valid'
         });
         return;
      }
   }
   User.findByPk(req.userId)
      .then((user) => {
         user
            .update({
               name,
               email,
               password,
               foto: req.file.path
            })
            .then((data) => {
               res.status(200).send({
                  status: 'success',
                  message: 'berhasil mengupdate data',
                  data
               });
            })
            .catch((err) => {
               res.status(500).send({
                  message: 'gagal mengupdate data',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'user tidak ditemukan',
            errors: err.message
         });
      });
};

const deleteUserByUser = (req, res) => {
   User.destroy({
      where: {
         id: req.userId
      }
   })
      .then((data) => {
         res.status(200).send({
            status: 'success',
            message: 'berhasil menghapus user',
            data
         });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
};

const searchUser = (req, res) => {
   const searchQuery = req.params.q;
   User.findAll({
      where: {
         name: {
            [Op.like]: `%${searchQuery}%`
         }
      }
   })
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

module.exports = {
   getUsers,
   getUsersByAuth,
   getUserById,
   getUserByRoles,
   editUserByAdmin,
   deleteUserByAdmin,
   editUserByUser,
   deleteUserByUser,
   searchUser
};
