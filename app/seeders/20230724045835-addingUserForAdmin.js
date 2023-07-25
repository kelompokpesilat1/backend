/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Mamang Galih',
      email: 'admin@gmail.com',
      password: '12345678',
      id_roles: 1,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('', null, {});
  },
};
