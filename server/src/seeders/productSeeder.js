"use strict";

/** @type {import('sequelize-cli').Migration} */
const iphoneProducts = require('./productsData/smartphone/iphone');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        ...iphoneProducts
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
