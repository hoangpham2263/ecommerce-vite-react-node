"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Address.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      name:DataTypes.STRING,
      house_address: DataTypes.STRING,  
      ward: DataTypes.STRING,  
      district: DataTypes.STRING,     
      city: DataTypes.STRING,  
      phone_number: DataTypes.STRING,  
      default: DataTypes.BOOLEAN,   
    },
    {
     sequelize,
      modelName: "Address",
    }
  );
  return Address;
};