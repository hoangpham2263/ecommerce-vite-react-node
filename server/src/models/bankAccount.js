"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank_Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bank_Account.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Bank_Account.init(
    {
      name: DataTypes.STRING,
      account_number: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bank_Account",
    }
  );
  return Bank_Account;
};
