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
      Product.hasMany(models.Config, { foreignKey: 'product_id' });
      Product.belongsTo(models.Ram, { foreignKey: 'ram_id' });
      Product.belongsTo(models.Capacity, { foreignKey: 'capacity_id' });
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
      Product.belongsTo(models.Version, { foreignKey: 'version_id' });
      Product.belongsToMany(models.Order, { through: 'Order_Item' });
      Product.belongsToMany(models.User, { through: 'Cart' });
      Product.belongsToMany(models.User, { through: 'Assessment' });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      slug: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      ram_id: DataTypes.INTEGER,
      capacity_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      version_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
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
