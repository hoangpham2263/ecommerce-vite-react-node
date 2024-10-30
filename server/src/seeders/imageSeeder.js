"use strict";

/** @type {import('sequelize-cli').Migration} */
const iphoneImages = require('./imagesData/smartphone/iphone');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Image", [
      ...iphoneImages
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
