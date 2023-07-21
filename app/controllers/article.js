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

module.exports = {
  getArticles,
  getArticleById,
};
