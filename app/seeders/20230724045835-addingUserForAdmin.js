const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'users',
         [
            {
               name: 'Mamang Galih',
               email: 'admin@gmail.com',
               password: bcrypt.hashSync('12345678'),
               id_roles: 1
            },
            {
               name: 'Zulfikar Muhamad',
               email: 'zulfikar@gmail.com',
               password: bcrypt.hashSync('123'),
               id_roles: 2
            },
            {
               name: 'Hilmy',
               email: 'hilmy123@gmail.com',
               password: bcrypt.hashSync('123'),
               id_roles: 3
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('', null, {});
   }
};
