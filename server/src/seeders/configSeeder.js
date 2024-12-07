"use strict";

/** @type {import('sequelize-cli').Migration} */
const iphoneConfigs = require('./configsData/smartphone/iphone');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Config",
      [
        ...iphoneConfigs,
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Config", null, {});
  },
};
