'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'SuperUsers',
      [
        {
          firstName: 'Super',
          lastName: 'Admin',
          email: 'mukesh@admin.com',
          password: bcrypt.hashSync(
            '$321!pass!123$',
            bcrypt.genSaltSync(8),
            null
          ), //'$321!pass!123$'
          // role: savedRole.id,
          // status: "active"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
    await queryInterface.bulkDelete('SuperUsers', null, {});
  },
};
