"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Sub_Product, { foreignKey: 'sub_product_id' });
    }
  }
  Image.init(
    {
      url: DataTypes.STRING,
      file_name: DataTypes.STRING,
      sub_product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
