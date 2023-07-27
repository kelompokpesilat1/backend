const { Op } = require("sequelize");
const { Article } = require("../models");
const { Comment } = require("../models");
const { Category } = require("../models");

const addArticles = async (req, res) => {
  const categoryName = req.body.category;
  console.log(req.body.category);
  const userId = req.userId;
  const category = await Category.findOne({
    where: { category: categoryName },
  });
  console.log(category);
  const { title, important, content, viewers } = req.body;
    Article.create({
      id_user: userId,
      id_category: category.id,
      title,
      author: userId,
      cover: req.file.path,
      viewers,
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
    }

const getArticles = (req, res) => {
   Article.findAll()
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

const getArticlesById = (req, res) => {
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
});
}

const putArticlesById = (req, res) => {
  const ArticleId = req.params.id;

  Article.findByPk(ArticleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          status: 'error',
          message: 'Article tidak ditemukan',
        });
      }
  article.update(req.body)
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

  const deleteArticlesById = (req, res) => {
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

const viewersIncrement = (req, res, next) => {
   const { id } = req.params;
   Article.findByPk(id)
      .then((data) => {
         data
            .increment({
               viewers: 1
            })
            .catch((err) => {
               res.status(500).send({
                  message: 'Error',
                  errors: err.message
               });
            });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error',
            errors: err.message
         });
      });
   next();
};

module.exports = {
  addArticles,
  getArticles,
  getArticlesById,
  putArticlesById,
  searchArticle,
  deleteArticlesById,
  viewersIncrement,
};
