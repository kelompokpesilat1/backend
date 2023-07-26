const { SEO } = require('../models');

const createSEO = (req, res) => {
  const {
    title, desc, logo, keywords,
  } = req.body;
  const { id } = req.params;
  SEO.create({
    id_article: id,
    title,
    desc,
    logo,
    keywords,
  }).then((data) => {
    res.send({
      status: 'success',
      message: 'berhasil membuat seo',
      data,
    });
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

const deleteSEO = (req, res) => {
  const { id } = req.params;
  SEO.destroy({
    where: {
      id,
    },
  }).then((data) => {
    res.status(200).send({
      status: 'success',
      message: 'berhasil menghapus seo',
      data,
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Error',
      errors: err.message,
    });
  });
};

module.exports = { createSEO, deleteSEO };
