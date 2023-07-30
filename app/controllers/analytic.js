const { Sequelize } = require('sequelize');
const { Article } = require('../models')

const getViewersPerMonth = async (req, res) => {
  try {
    const monthNames = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    const results = await Article.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('viewers')), 'views'],
      ],
      group: [Sequelize.fn('YEAR', Sequelize.col('createdAt')), Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
      raw: true,
    });

    const allMonthsData = [];
      for (let month = 1; month <= 12; month++) {
        const foundMonth = results.find((result) => parseInt(result.month) === month);
        const monthData = {
          year: new Date().getFullYear(),
          month,
          views: foundMonth ? foundMonth.views : 0,
        };
      allMonthsData.push(monthData);
    }
    
    const resultsWithMonthNames = allMonthsData.map((result) => {
      return {
        ...result,
        month: monthNames[result.month],
      };
    });

    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      resultsWithMonthNames
    })
  } catch (error) {
    console.error('Error while fetching transaction counts:', error);
    throw error;
  }
}; 

module.exports = { getViewersPerMonth }
