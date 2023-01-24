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
      'Permissions',
      [
        {
          id: 1,
          perm_name: 'user_index',
          perm_description: 'User Index',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          perm_name: 'user_add',
          perm_description: 'User Add',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          perm_name: 'user_edit',
          perm_description: 'User Edit',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          perm_name: 'user_store',
          perm_description: 'User Store',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          perm_name: 'user_update',
          perm_description: 'User Update',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          perm_name: 'user_delete',
          perm_description: 'User Delete',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          perm_name: 'role_index',
          perm_description: 'Role Index',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          perm_name: 'role_add',
          perm_description: 'Role Add',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          perm_name: 'role_edit',
          perm_description: 'Role Edit',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          perm_name: 'role_store',
          perm_description: 'Role Store',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          perm_name: 'role_update',
          perm_description: 'Role Update',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          perm_name: 'role_delete',
          perm_description: 'Role Delete',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          perm_name: 'permission_index',
          perm_description: 'Permission Index',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          perm_name: 'permission_add',
          perm_description: 'Permission Add',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          perm_name: 'permission_edit',
          perm_description: 'Permission Edit',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          perm_name: 'permission_store',
          perm_description: 'Permission Store',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          perm_name: 'permission_update',
          perm_description: 'Permission Update',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          perm_name: 'permission_delete',
          perm_description: 'Permission Delete',
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
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
