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
      Address.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      full_address: DataTypes.STRING,   // Địa chỉ đầy đủ
      street_name: DataTypes.STRING,    // Tên đường
      ward: DataTypes.STRING,           // Phường/xã
      district: DataTypes.STRING,       // Quận/huyện
      province: DataTypes.STRING,       // Tỉnh/thành phố
      country: DataTypes.STRING,        // Quốc gia
      phone_number: DataTypes.STRING,   //  Số điện thoại
      notes: DataTypes.STRING,          // Ghi chú bổ sung
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};