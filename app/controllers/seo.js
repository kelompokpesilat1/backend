const { SEO } = require('../models');

const createSEO = async (req, res) => {
  try {
    const {
      title, desc, keywords,
    } = req.body;
    const { id } = req.params;

    const seoData = await SEO.create({
      title,
      desc,
      keywords,
      logo: req.file.path,
    });

    res.send({
      status: 'success',
      message: 'berhasil membuat seo',
      data: seoData,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getSEO = async (req, res) => {
  try {
    // Ambil seluruh data SEO
    const seoList = await SEO.findAll();

    if (seoList.length === 0) {
      return res.status(404).send('Tidak ada data SEO.');
    }

    res.send({
      status: 'success',
      data: seoList,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Error',
      errors: err.message,
    });
  }
};

const updateSEO = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, desc, keywords,
    } = req.body;

    // Periksa apakah SEO dengan id yang diberikan ada di database
    const existingSEO = await SEO.findByPk(id);

    if (!existingSEO) {
      return res.status(404).send('SEO tidak ditemukan.');
    }

    // Lakukan update data SEO
    await existingSEO.update({
      title,
      desc,
      keywords,
      logo: req.file ? req.file.path : existingSEO.logo, // Pastikan mengambil logo yang lama jika tidak ada file baru
    });

    res.send({
      status: 'success',
      message: 'berhasil mengubah seo',
      data: existingSEO,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};



module.exports = { updateSEO, getSEO, createSEO };
