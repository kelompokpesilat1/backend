'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         'categories',
         [
            {
               category: 'olahraga'
            },
            {
               category: 'edukasi'
            },
            {
               category: 'gaming'
            },
            {
               category: 'pendidikan'
            },
            {
               category: 'hiburan'
            }
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   }
};
