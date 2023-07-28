const { Sequelize } = require('sequelize');
const { Article } = require('../models')

const getViewersPerMonth = async (req, res) => {
  try {
    const results = await Article.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('viewers')), 'views'],
      ],
      group: [Sequelize.fn('YEAR', Sequelize.col('createdAt')), Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
      raw: true,
    });
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      results
    })
  } catch (error) {
    console.error('Error while fetching transaction counts:', error);
    throw error;
  }
}; 

module.exports = { getViewersPerMonth }
