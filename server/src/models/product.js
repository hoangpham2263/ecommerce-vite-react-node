import slugify from "slugify";

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, { foreignKey: 'product_id' });
      Product.belongsTo(models.Product, { foreignKey: 'product_id' });
      Product.belongsTo(models.Capacity, { foreignKey: 'capacity_id' });
      Product.belongsTo(models.Ram, { foreignKey: 'ram_id' });
      Product.belongsTo(models.Color, { foreignKey: 'color_id' });
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.belongsToMany(models.Order, { through: 'Order_Item' });
      Product.belongsToMany(models.User, { through: 'Cart' });
      Product.belongsToMany(models.User, { through: 'Assessment' });

      // Product.hasMany(models.Order_Item, { foreignKey: 'product_id' });
      // Product.hasMany(models.Cart, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      capacity_id:DataTypes.INTEGER,
      ram_id:DataTypes.INTEGER,
      category_id:DataTypes.INTEGER,
      color_id:DataTypes.INTEGER,
      stock:DataTypes.INTEGER,
      discount:DataTypes.INTEGER,
      price:DataTypes.FLOAT,
      desc:DataTypes.STRING,
      slug:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      // hooks: {
      //   beforeValidate: (subProduct, options) => {
      //     if (subProduct.title) {
      //       subProduct.slug = slugify(subProduct.title, { lower: true });
      //     }
      //   },
      // },
    }
  );
  return Product;
};
