/* eslint-disable quotes */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
const { Op, where } = require('sequelize');
const { Article } = require('../models');
const { Comments } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const addArticles = async (req, res) => {
  const categoryName = req.body.category;
  const { userId } = req;
  const category = await Category.findOne({
    where: { category: categoryName },
  });
  console.log(category);
  const {
    title, cover, important, content,
  } = req.body;
  Article.create({
    id_user: userId,
    id_category: category.id,
    title,
    author: userId,
    cover: req.file.path
    important,
    content,
  })
    .then((data) => {
      res.send({
        status: 'success',
        message: 'berhasil menampilkan data',
        data,
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
const getArticles = (req, res) => {
  Article.findAll()
    .then((data) => {
      res.send({
        status: 'success',
        message: 'berhasil menampilkan data',
        data,
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

const getArticlesId = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, { include: Comments });
    const category = await Category.findOne({ where: { id: article.id_category } });
    const comment = await Comments.findAll({ where: { id_article: article.id }, include: User });

    if (!article) {
      res.status(500).send({
        status: 'error',
        message: 'article tidak ditemukan',
      });
    }
    res.status(200).send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data: {
        category: category.category,
        data: article,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: 'Terjadi kesalahan saat menampilkan',
      error: error.message,
    });
  }
};

const putArticles = (req, res) => {
  const ArticleId = req.params.id;

  Article.findByPk(ArticleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          status: 'error',
          message: 'Article tidak ditemukan',
        });
      }
      article
        .update(req.body)
        .then((updatedArticle) => {
          res.status(200).send({
            status: 'success',
            message: 'Article berhasil diperbarui',
            data: updatedArticle,
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: 'error',
            message: 'Terjadi kesalahan saat memperbarui artikel',
            errors: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: 'Terjadi kesalahan',
        errors: err.message,
      });
    });
};

const deleteArticles = (req, res) => {
  const ArticleId = req.params.id;
  const { role } = req.userId;

  Article.findByPk(ArticleId)
    .then((Article) => {
      if (!Article) {
        return res.status(404).send({
          message: 'Article tidak ditemukan',
        });
      }
      Article.destroy()
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'Article berhasil dihapus',
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: 'error',
            message: 'Terjadi kesalahan saat menghapus artikel',
            errors: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: 'Terjadi kesalahan',
        errors: err.message,
      });
    });
};

const searchArticle = (req, res) => {
  const searchQuery = req.params.id;
  Article.findAll({
    where: {
      title: {
        [Op.like]: `%${searchQuery}%`,
      },
    },
  })
    .then((data) => {
      res.send({
        status: 'success',
        message: 'berhasil menampilkan data',
        data,
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

const viewersIncrement = (req, res, next) => {
  const { id } = req.params;
  Article.findByPk(id)
    .then((data) => {
      data
        .increment({
          viewers: 1,
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
  next();
};

module.exports = {
  addArticles,
  getArticles,
  getArticlesId,
  putArticles,
  searchArticle,
  deleteArticles,
  viewersIncrement,
};
