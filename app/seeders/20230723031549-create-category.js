'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         'categories',
         [
            {
               name: 'olahraga'
            },
            {
               name: 'edukasi'
            },
            {
               name: 'gaming'
            },
            {
               name: 'pendidikan'
            },
            {
               name: 'hiburan'
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
