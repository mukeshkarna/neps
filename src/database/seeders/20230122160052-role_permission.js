'use strict';

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
      'RolePermissions',
      [
        {
          id: 1,
          role_id: 1,
          perm_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          role_id: 1,
          perm_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          role_id: 1,
          perm_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          role_id: 1,
          perm_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          role_id: 1,
          perm_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          role_id: 1,
          perm_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          role_id: 1,
          perm_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          role_id: 1,
          perm_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          role_id: 1,
          perm_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          role_id: 1,
          perm_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          role_id: 1,
          perm_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          role_id: 1,
          perm_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          role_id: 1,
          perm_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          role_id: 1,
          perm_id: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          role_id: 1,
          perm_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          role_id: 1,
          perm_id: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          role_id: 1,
          perm_id: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          role_id: 1,
          perm_id: 18,
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
    await queryInterface.bulkDelete('RolePermissions', null, {});

  },
};
