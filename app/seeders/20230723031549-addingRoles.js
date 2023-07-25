/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'AUTHOR',
      },
      {
        id: 3,
        name: 'USER',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
