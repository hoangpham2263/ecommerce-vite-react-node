"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_Item.belongsTo(models.Product, { foreignKey: 'ProductId' });
      // Order_Item.belongsTo(models.Order, { foreignKey: 'OrderId' });
    }
  }
  Order_Item.init(
    {
      OrderId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Order_Item",
    }
  );
  return Order_Item;
};
