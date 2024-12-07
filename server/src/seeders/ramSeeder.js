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
      "Ram",
      [
        { id: 1, name: "1GB" },
        { id: 2, name: "2GB" },
        { id: 3, name: "3GB" },
        { id: 4, name: "4GB" },
        { id: 5, name: "6GB" },
        { id: 6, name: "8GB" },
        { id: 7, name: "12GB" },
        { id: 8, name: "16GB" },
        { id: 9, name: "18GB" },
        { id: 10, name: "24GB" },
        { id: 11, name: "32GB" },
        { id: 12, name: "64GB" },
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
