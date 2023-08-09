'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Articles', 'publish', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }) 
  },

  async down (queryInterface, Sequelize) {
    // queryInterface.removeColumn('Articles', 'publish')
  }
};
