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
          name: "16GB",
        },
        {
          name: "32GB",
        },
        {
          name: "64GB",
        },
        {
          name: "128GB",
        },
        {
          name: "256GB",
        },
        {
          name: "512GB",
        },
        {
          name: "1TB",
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
