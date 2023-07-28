'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'ADMIN',
        email: 'admin123@gmail.com',
        password: bcrypt.hashSync('admin123'),
        id_roles: 1
      },
      {
        name: 'AUTHOR',
        email: 'author@gmail.com',
        password: bcrypt.hashSync('author123'),
        id_roles: 2
      },
      {
        name: 'USER',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('user123'),
        id_roles: 3
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};