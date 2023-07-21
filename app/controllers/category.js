const { Category } = require('../models');
const { Article } = require('../models');

// add category
const addCategory = (req, res) => {
  const { category } = req.body;

  Category.create({ category })
    .then((newCategory) => {
      res.status(201).send({
        status: 'success',
        message: 'Kategori berhasil ditambahkan',
        category: newCategory,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error',
        errors: err.message,
      });
    });
};

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
module.exports = { addCategory, getCategory, getCategoryById };
