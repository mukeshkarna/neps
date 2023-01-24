'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Addresses.belongsTo(models.OAuthUsers, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Addresses.init(
    {
      type: DataTypes.STRING,
      userId: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      ward: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Addresses',
    }
  );
  return Addresses;
};
