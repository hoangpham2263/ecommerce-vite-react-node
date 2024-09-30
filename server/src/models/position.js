"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.hasMany(models.User, { foreignKey: 'position_id' });
      Position.belongsToMany(models.Role, { through: 'Position_Role' });
    }
  }
  Position.init(
    {
      key_position: DataTypes.INTEGER,
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      state: DataTypes.BOOLEAN,
      is_master: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
