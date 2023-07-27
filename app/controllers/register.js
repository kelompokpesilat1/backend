/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const checkDuplicateEmail = (req, res, next) => {
   User.findOne({
      where: {
         email: req.body.email
      }
   }).then((user) => {
      if (user) {
         res.status(409).send({
            auth: false,
            name: req.body.name,
            message: 'Error',
            errors: 'Email is already taken!'
         });
         return;
      }
      next();
   });
};

const register = (req, res) => {
   const { name, email, foto } = req.body;
   const password = bcrypt.hashSync(req.body.password);
   const roles = 3;

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email)) {
      res.status(401).send({
         status: 'failed',
         message: 'maaf email tidak valid'
      });
      return;
   }
   User.create({
      name,
      email,
      password,
      foto,
      id_roles: roles
   })
      .then((data) => {
         res.status(200).send({
            status: 'success',
            message: 'berhasil menambah data',
            category: {
               data
            }
         });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
};

module.exports = { checkDuplicateEmail, register };
