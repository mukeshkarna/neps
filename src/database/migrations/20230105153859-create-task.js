'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      name: {
          allowNull: false,
          type: Sequelize.STRING

      },
      short_description: {
          allowNull: false,
          type: Sequelize.TEXT

      },
      date_time: {
          allowNull: false,
          type: Sequelize.DATE

      },

      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      }
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');

  }
};