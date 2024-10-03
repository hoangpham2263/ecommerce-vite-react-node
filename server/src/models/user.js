"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Position, { foreignKey: 'position_id' });
      User.hasMany(models.Address, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
      User.hasMany(models.Bank_Account, { foreignKey: 'user_id' });
      User.hasMany(models.Message, { foreignKey: 'user_id_send' });
      User.hasMany(models.Message, { foreignKey: 'user_id_receive' });
      User.belongsToMany(models.Product, { through: 'Cart' });
      User.belongsToMany(models.Product, { through: 'Assessment' });

      // User.hasOne(models.Assessment, { foreignKey: 'user_id' });
      // User.hasOne(models.Cart, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      full_name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      is_verified: DataTypes.BOOLEAN,
      position_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
