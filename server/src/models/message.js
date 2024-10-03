"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
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
      user_id_send: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id_receive: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        content: DataTypes.STRING,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
