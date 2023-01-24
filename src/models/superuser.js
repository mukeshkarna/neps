'use strict';
const { Model } = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class SuperUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // SuperUser.hasOne(models.Role, {
      //   foreignKey: 'role_id',
      //   as: 'role',
      // });
      SuperUser.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
      });
    }
  }
  SuperUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role_id: DataTypes.INTEGER,
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
      },
    },
    {
      sequelize,
      modelName: 'SuperUser',
      timestamps: true,
    }
  );

  /**
   * Creating a custom method for our User model.
   * This will check if an un-hashed password entered by the
   * user can be compared to the hashed password stored in our database
   */
  SuperUser.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  SuperUser.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  return SuperUser;
};
