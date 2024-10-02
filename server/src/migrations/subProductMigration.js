"use strict";

const sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sub_Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title:{
        type:Sequelize.STRING
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      capacity_id: {
        type: Sequelize.INTEGER,
      },
      ram_id: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      color_id: {
        type: Sequelize.INTEGER,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      desc: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Sub_Product");
  },
};
