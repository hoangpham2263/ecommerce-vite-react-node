"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Capacity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Capacity.hasMany(models.Sub_Product, { foreignKey: 'capacity_id' });
    }
  }
  Capacity.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Capacity",
    }
  );
  return Capacity;
};
