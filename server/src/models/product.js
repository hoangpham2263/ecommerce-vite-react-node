("use strict");
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
      Product.hasMany(models.Sub_Product, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeValidate: (product, options) => {
          if (product.title) {
            product.slug = slugify(product.title, { lower: true });
          }
        },
      },
    }
  );
  return Product;
};
