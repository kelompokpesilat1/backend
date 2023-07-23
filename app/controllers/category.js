/* eslint-disable consistent-return */
const { Category } = require('../models');
const { Article } = require('../models');

// add category
const addCategory = (req, res, next) => {
  const { category } = req.body;

  const userId = req.user.userId;

  Category.create({
    category,
    userId,
  })
    .then((newCategory) => {
      res.status(201).send({
        status: 'success',
        message: 'Category successfully created.',
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

const updateCategoryById = (req, res) => {
  const categoryId = req.params.id;
  const { category } = req.body;

  Category.findByPk(categoryId)
    .then((foundCategory) => {
      if (!foundCategory) {
        return res.status(404).send({
          message: 'Kategori tidak ditemukan',
        });
      }

      foundCategory.update({ category })
        .then((updatedCategory) => {
          res.status(200).send({
            status: 'success',
            message: 'Kategori berhasil diupdate',
            category: updatedCategory,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error',
            errors: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error',
        errors: err.message,
      });
    });
};

const deleteCategoryById = (req, res) => {
  const categoryId = req.params.id;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: 'Kategori tidak ditemukan',
        });
      }

      category.destroy()
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'Kategori berhasil dihapus',
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error',
            errors: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error',
        errors: err.message,
      });
    });
};
module.exports = {
  addCategory, getCategory, getCategoryById, updateCategoryById, deleteCategoryById,
};
