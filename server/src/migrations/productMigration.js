"use strict";

const sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      ram_id: {
        type: Sequelize.INTEGER,
      },
      capacity_id: {
        type: Sequelize.INTEGER,
      },
      brand_id: {
        type: Sequelize.INTEGER,
      },
      version_id: {
        type: Sequelize.INTEGER,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Product");
  },
};
