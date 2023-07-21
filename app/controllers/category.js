const { Category } = require('../models');
const { Article } = require('../models');

const getCategory = (req, res) => {
  Category.findAll().then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const getCategoryById = (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => {
      Article.findAll({
        where: {
          id_category: category.id,
        },
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil menampilkan data',
          category: {
            kategory: category.category,
            article: data,
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
module.exports = { getCategory, getCategoryById };
