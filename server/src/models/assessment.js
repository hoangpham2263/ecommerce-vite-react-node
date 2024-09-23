"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assessment.belongsTo(models.User, { foreignKey: 'user_id' });
      Assessment.belongsTo(models.Sub_Product, { foreignKey: 'sub_product_id' });
    }
  }
  Assessment.init(
    {
      user_id: DataTypes.INTEGER,
      sub_product_id: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Assessment",
    }
  );
  return Assessment;
};
