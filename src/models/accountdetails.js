'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccountDetails.belongsTo(models.OAuthUsers, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  AccountDetails.init({
    userId: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    bankName: DataTypes.STRING,
    bankBranch: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccountDetails',
  });
  return AccountDetails;
};