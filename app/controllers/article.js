/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const { Article } = require('../models');
const { Comments } = require('../models');

const getArticles = (req, res) => {
  Article.findAll().then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const getArticleById = (req, res) => {
  Article.findByPk(req.params.id)
    .then((article) => {
      article.viewers += 1;
      Comments.findAll({
        where: {
          id_article: article.id,
        },
      }).then((data) => {
        res.status(200).send({
          status: 'success',
          message: 'berhasil menampilkan data',
          category: {
            title: article.title,
            author: article.author,
            cover: article.cover,
            viewers: article.viewers,
            comments: data,
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

const searchArticle = (req, res) => {
  const searchQuery = req.params.id;
  Article.findAll({
    where: {
      title: {
        [Op.like]: `%${searchQuery}%`,
      },
    },
  }).then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const viewersIncrement = (req, res, next) => {
  const { id } = req.params;
  Article.findByPk(id)
    .then((data) => {
      data.increment({
        viewers: 1,
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
  next();
};

const addArticle = (req, res) => {
  const { userId } = req;
  const { category } = req.body;
  const {
    title, author, cover, important,
  } = req.body;
  Article.create({
    id_user: userId,
    id_category: category,
    title,
    author,
    cover,
    important,
  })
    .then((data) => {
      res.send({
        status: 'success',
        message: 'berhasil menampilkan data',
        data,
      });
    }).catch((err) => {
      res.status(400).send(err.message);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  searchArticle,
  viewersIncrement,
  addArticle,
};
