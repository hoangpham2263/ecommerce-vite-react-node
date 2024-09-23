"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.Position_Role, { through: "role_id" });
      Role.belongsToMany(models.Position, { through: 'Position_Role' });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      desc:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
