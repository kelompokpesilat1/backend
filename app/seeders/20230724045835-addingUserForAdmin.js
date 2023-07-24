/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: 'adminKelompok1',
      id_roles: 1,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
