const { Roles } = require('../models');
const { User } = require('../models');

const getRoles = (req, res) => {
  Roles.findAll().then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const getRoleById = (req, res) => {
  Roles.findByPk(req.params.id)
    .then((role) => {
      User.findAll({
        where: {
          id_roles: role.id,
        },
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil menampilkan data',
          category: {
            name_roles: role.roles,
            user: data,
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

module.exports = { getRoles, getRoleById };
