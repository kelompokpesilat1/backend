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
      where: { name: categoryName }
   });
   const { title, important, content, name } = req.body;
   Article.create({
      id_user: userId,
      id_category: category.id,
      title,
      author: name,
      cover: req.file.path,
      important,
      content,
      viewers: 1
   })
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const getArticles = (req, res) => {
   Article.findAll({ include: Category })
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const getArticlesById = async (req, res) => {
   try {
      const article = await Article.findByPk(req.params.id);
      const category = await Category.findOne({
         where: { id: article.id_category }
      });
      const comment = await Comments.findAll({
         where: { id_article: article.id },
         include: User
      });

      if (!article) {
         res.status(500).send({
            status: 'error',
            message: 'article tidak ditemukan'
         });
      }
      res.status(200).send({
         status: 'success',
         message: 'berhasil menampilkan data',
         category: category.name,
         article,
         comment
      });
   } catch (error) {
      res.status(500).send({
         message: 'Terjadi kesalahan saat menampilkan',
         error: error.message
      });
   }
};

const putArticlesById = async (req, res) => {
   try {
      const { content, title, important, category } = req.body;
      const article = await Article.findByPk(req.params.id);
      if (!article) {
         return res.status(404).send({
            status: 'error',
            message: 'Article tidak ditemukan'
         });
      }
      const nameCategory = await Category.findOne({
         where: { name: category }
      });
      if (!nameCategory) {
         return res.status(404).send({
            status: 'error',
            message: 'category tidak ditemukan'
         });
      }
      article.update({
         title,
         cover: req.file.path,
         content,
         important,
         id_category: nameCategory.id
      });
      res.status(200).send({
         status: 'success',
         message: 'berhasil menampilkan data',
         category: nameCategory.name,
         article
      });
   } catch (error) {
      res.status(500).send({
         status: 'error',
         message: 'Terjadi kesalahan',
         errors: error.message
      });
   }
};

const deleteArticlesById = (req, res) => {
   const ArticleId = req.params.id;
   Article.findByPk(ArticleId)
      .then((Article) => {
         if (!Article) {
            return res.status(404).send({
               message: 'Article tidak ditemukan'
            });
         }
         Article.destroy()
            .then(() => {
               res.status(200).send({
                  status: 'success',
                  message: 'Article berhasil dihapus'
               });
            })
            .catch((err) => {
               res.status(500).send({
                  status: 'error',
                  message: 'Terjadi kesalahan saat menghapus artikel',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            status: 'error',
            message: 'Terjadi kesalahan',
            errors: err.message
         });
      });
};

const searchArticle = (req, res) => {
   const searchQuery = req.params.id;
   Article.findAll({
      where: {
         title: {
            [Op.like]: `%${searchQuery}%`
         }
      }
   })
      .then((data) => {
         res.send({
            status: 'success',
            message: 'berhasil menampilkan data',
            data
         });
      })
      .catch((err) => {
         res.status(400).send(err.message);
      });
};

const viewersIncrement = async (req, res, next) => {
   try {
      const { id } = req.params;
      const article = await Article.findByPk(id);
      if (!article) {
         return res.status(500).send({
            status: 'fail',
            message: 'article tidak ditemukan'
         });
      }
      console.log(article);
      article.increment({
         viewers: 1
      });
      next();
   } catch (error) {
      res.status(500).send({
         status: 'error',
         message: 'Terjadi kesalahan',
         errors: err.message
      });
   }
};

module.exports = {
   addArticles,
   getArticles,
   getArticlesById,
   putArticlesById,
   searchArticle,
   deleteArticlesById,
   viewersIncrement
};
