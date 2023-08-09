/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = (req, res) => {
   User.findOne({
      where: {
         email: req.body.email
      }
   })
      .then((data) => {
         if (!data) {
            return res.status(404).send({
               auth: false,
               email: req.body.email,
               message: 'Error',
               errors: 'email Not Found.'
            });
         }

         const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
         );
         if (!passwordIsValid) {
            return res.status(401).send({
               auth: false,
               id: req.body.email,
               message: 'Error',
               errors: 'Invalid Password!'
            });
         }

         const jwtToken = jwt.sign({ id: data.id }, process.env.SECRET, {
            expiresIn: 86400
         });

         const token = jwtToken;

         res.status(200).send({
            auth: true,
            user: {
               id: data.id,
               role: data.id_roles,
               email: data.email,
               name: data.name
            },
            message: 'success',
            token,
            errors: null
         });
      })
      .catch((err) => {
         res.status(500).send({
            auth: false,
            id: req.body.email,
            message: 'Error',
            errors: err.message
         });
      });
};

module.exports = { login };
