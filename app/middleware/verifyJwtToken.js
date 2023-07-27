/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-dupe-keys */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = (req, res, next) => {
   const tokenHeader = req.headers.authorization;
   if (!tokenHeader) {
      return res.status(500).send({
         auth: false,
         message: 'Error',
         errors: 'No token provided'
      });
   }
   if (tokenHeader.split(' ')[0] !== 'Bearer') {
      return res.status(500).send({
         auth: false,
         message: 'Error',
         errors: 'Incorrect token format'
      });
   }

   const token = tokenHeader.split(' ')[1];
   if (!token) {
      return res.status(403).send({
         auth: false,
         message: 'Error',
         errors: 'No token provided'
      });
   }

   jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
         return res.status(500).send({
            auth: false,
            message: 'Error',
            errors: err
         });
      }
      req.userId = decoded.id;
      next();
   });
};

const isAdmin = (req, res, next) => {
   User.findOne({
      where: {
         id: req.userId
      }
   }).then((user) => {
      console.log(user.id_roles);
      if (user.id_roles === 1) {
         next();
         return;
      }
      res.status(403).send({
         auth: false,
         message: 'Error',
         message: 'Require Admin Role'
      });
   });
};

const isAuthor = (req, res, next) => {
   User.findOne({
      where: {
         id: req.userId
      }
   }).then((user) => {
      if (user.id_roles === 2) {
         next();
         return;
      }
      res.status(403).send({
         auth: false,
         message: 'Error',
         message: 'Require author Role'
      });
   });
};

module.exports = {
   verifyToken,
   isAuthor,
   isAdmin
};
