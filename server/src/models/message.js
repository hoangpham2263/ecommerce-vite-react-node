"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'user_id_send' });
      Message.belongsTo(models.User, { foreignKey: 'user_id_receive' });
    }
  }
  Message.init(
    {
      user_id_send: DataTypes.STRING,
      user_id_receive: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
