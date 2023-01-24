'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OAuthUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prefix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      suffix: {
        type: Sequelize.STRING,
      },
      mobileNumber: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      citizenshipNumber: {
        type: Sequelize.STRING,
      },
      citizenshipIssuedDate: {
        type: Sequelize.DATE,
      },
      citizenshipIssuedDistrict: {
        type: Sequelize.STRING,
      },
      passportNo: {
        type: Sequelize.STRING,
      },
      passportCountry: {
        type: Sequelize.STRING,
      },
      passportExpiryDate: {
        type: Sequelize.DATE,
      },
      citizenshipIssuedDistrict: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      panNo: {
        type: Sequelize.STRING,
      },
      citNo: {
        type: Sequelize.STRING,
      },
      epfNo: {
        type: Sequelize.STRING,
      },
      ssfNo: {
        type: Sequelize.STRING,
      },
      nationalIdNo: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OAuthUsers');
  },
};
