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
        { id: 1, name: "8GB" },
        { id: 2, name: "16GB" },
        { id: 3, name: "32GB" },
        { id: 4, name: "64GB" },
        { id: 5, name: "128GB" },
        { id: 6, name: "256GB" },
        { id: 7, name: "512GB" },
        { id: 8, name: "1TB" },
        { id: 9, name: "2TB" },
        { id: 10, name: "4TB" },
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
