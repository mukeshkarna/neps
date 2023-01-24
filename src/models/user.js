'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      /**
       * Hooks are automatic methods that run during various phases of the User Model lifecycle
       * In this case, before a User is created, we will automatically hash their password
       */
      hooks: {
        beforeCreate: async user => {
          const salt = await bcrypt.genSaltSync(10); //whatever number you want
          user.password = await bcrypt.hashSync(user.password, salt, null);
        },
      },
    }
  );

  /**
   * Creating a custom method for our User model.
   * This will check if an un-hashed password entered by the
   * user can be compared to the hashed password stored in our database
   */
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
