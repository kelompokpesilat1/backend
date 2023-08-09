/* eslint-disable quotes */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
const { Op, where } = require('sequelize');
const {
  Article,
  Category,
  User,
  Comments,
  Log,
  Replay_comment
} = require('../models');

const addArticles = async (req, res) => {
  const categoryName = req.body.category;
  const { userId } = req;
  const publish = false;
  console.log(publish);
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
    viewers: 1,
    publish
  })
    .then((data) => {
      res.send({
        status: 'success',
        message: 'berhasil membuat article',
        data: data
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

const getArticlesTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const article = await Article.findOne({ where: { title: title } });

    if (!article) {
      res.status(404).send({
        status: 'error',
        message: 'article tidak ditemukan'
      });
    }
    const category = await Category.findOne({
      where: { id: article.id_category }
    });

    if (!category) {
      return res.status(404).json({ message: 'category tidak ditemukan' });
    }
    const comment = await Comments.findAll({
      where: { id_article: article.id },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Replay_comment,
          attributes: ['replay']
        }
      ]
    });

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

const getArticlesByQUery = async (req, res) => {
  try {
    const { title } = req.query;
    const article = await Article.findOne({ where: { title: title } });

    if (!article) {
      res.status(404).send({
        status: 'error',
        message: 'article tidak ditemukan'
      });
    }
    const category = await Category.findOne({
      where: { id: article.id_category }
    });

    if (!category) {
      return res.status(404).json({ message: 'category tidak ditemukan' });
    }
    const comment = await Comments.findAll({
      where: { id_article: article.id },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Replay_comment,
          attributes: ['replay']
        }
      ]
    });

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
  const { title } = req.params;
  const categoryName = req.body.category;
  const { userId } = req;

  try {
    // Cari artikel berdasarkan ID
    const article = await Article.findOne({ where: { title: title } });

    // Jika artikel tidak ditemukan
    if (!article) {
      return res.status(404).send({
        status: 'fail',
        message: 'Artikel tidak ditemukan'
      });
    }

    // Cari kategori berdasarkan nama
    const category = await Category.findOne({
      where: { name: categoryName }
    });

    // Update data artikel
    await article.update({
      id_category: category.id,
      title: req.body.title,
      important: req.body.important,
      content: req.body.content,
      publish: req.body.publish
      // Jika Anda ingin mengupdate cover juga, Anda dapat menambahkan properti cover dengan req.file.path
    });

    return res.status(200).send({
      status: 'success',
      message: 'Berhasil mengupdate artikel',
      data: article
    });
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Terjadi kesalahan saat mengupdate artikel',
      error: error.message
    });
  }
};

const deleteArticlesById = async (req, res) => {
  const articleTitle = req.params.title;

  const article = await Article.findOne({ where: { title: articleTitle } });

  if (!article) {
    return res.status(404).send({
      status: 'error',
      message: 'Artikel tidak ditemukan'
    });
  }

  const deleteArticle = await article.destroy();

  if (deleteArticle) {
    return res.status(200).send({
      status: 'success',
      message: 'Article berhasil dihapus'
    });
  }

  res.status(500).send({
    status: 'error',
    message: 'Terjadi kesalahan saat menghapus artikel',
    errors: err.message
  });
};

const searchArticle = (req, res) => {
  const searchQuery = req.params.title;
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
    const { title } = req.query;
    console.log(title);
    const userIp = req.ip;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set waktu ke awal hari

    const article = await Article.findOne({
      where: { title: title },
      include: [{ model: Log }]
    });

    if (!article) {
      return res.status(500).send({
        status: 'fail',
        message: 'article tidak ditemukan'
      });
    }

    const existingLog = await Log.findOne({
      where: {
        log: userIp,
        createdAt: {
          [Op.gte]: today
        }
      },
      include: [
        {
          model: Article,
          where: { id: article.id }
        }
      ]
    });

    if (existingLog) {
      return next();
    }

    const log = await Log.create({ log: userIp });
    await log.addArticle(article);

    article.increment({
      viewers: 1
    });

    next();
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Terjadi kesalahan',
      errors: error.message
    });
  }
};

module.exports = {
  addArticles,
  getArticles,
  getArticlesTitle,
  putArticlesById,
  searchArticle,
  deleteArticlesById,
  viewersIncrement,
  getArticlesByQUery
};
