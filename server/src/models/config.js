import slugify from "slugify";

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Config.hasMany(models.Image, { foreignKey: 'config_id' });
      Config.belongsTo(models.Color, { foreignKey: 'color_id' });
      Config.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  Config.init(
    {
      price: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Config",
    }
  );
  return Config;
};
