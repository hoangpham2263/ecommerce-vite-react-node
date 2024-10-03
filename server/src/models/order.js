"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Order_Line, { foreignKey: 'order_line_id' });
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.belongsToMany(models.Product, { through: 'Order_Item' });
      // Order.hasMany(models.Order_Item, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      order_line_id: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
