"use strict";

const sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order_Item", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      sub_product_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Order_Item");
  },
};
