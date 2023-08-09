/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
const { Article } = require('../models');
const { User } = require('../models');

const viewAuthor = (req, res) => {
  User.findByPk(req.userId)
    .then((dataUser) => {
      Article.findAll({
        where: {
          id_user: dataUser.id,
        },
      })
        .then((result) => {
          let total = 0;
          for (const prop in result) {
            if (result.hasOwnProperty(prop)) {
              total += result[prop].viewers;
            }
          }
          res.send({
            result: {
              total,
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

const viewForAdmin = (req, res) => {
  Article.findAll().then((data) => {
    let total = 0;
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        total += data[prop].viewers;
      }
    }
    res.send({
      total,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

module.exports = { viewAuthor, viewForAdmin };
