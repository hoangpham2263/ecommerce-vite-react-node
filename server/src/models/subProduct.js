import slugify from "slugify";

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sub_Product.hasMany(models.Image, { foreignKey: 'sub_product_id' });
      Sub_Product.belongsTo(models.Product, { foreignKey: 'product_id' });
      Sub_Product.belongsTo(models.Capacity, { foreignKey: 'capacity_id' });
      Sub_Product.belongsTo(models.Color, { foreignKey: 'color_id' });
      Sub_Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Sub_Product.hasMany(models.Assessment, { foreignKey: 'sub_product_id' });
      Sub_Product.belongsToMany(models.Order, { through: 'Order_Item' });
      Sub_Product.belongsToMany(models.User, { through: 'Cart' });

      // Sub_Product.hasMany(models.Order_Item, { foreignKey: 'sub_product_id' });
      // Sub_Product.hasMany(models.Cart, { foreignKey: 'sub_product_id' });
    }
  }
  Sub_Product.init(
    {
      product_id: DataTypes.INTEGER,
      capacity_id:DataTypes.INTEGER,
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
      modelName: "Sub_Product",
      hooks: {
        beforeValidate: (subProduct, options) => {
          if (subProduct.title) {
            subProduct.slug = slugify(subProduct.title, { lower: true });
          }
        },
      },
    }
  );
  return Sub_Product;
};
