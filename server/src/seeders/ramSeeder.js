"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Capacity",
      [
        {
          name: "2GB",
        },
        {
          name: "3GB",
        },
        {
          name: "4GB",
        },
        {
          name: "6GB",
        },
        {
          name: "8GB",
        },
        {
          name: "12GB",
        },
        {
          name: "16GB",
        },
        {
          name: "18GB",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
