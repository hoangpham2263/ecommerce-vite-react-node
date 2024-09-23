"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Line.hasMany(models.Order, { foreignKey: 'order_line_id' });
    }
  }
  Order_Line.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order_Line",
    }
  );
  return Order_Line;
};
