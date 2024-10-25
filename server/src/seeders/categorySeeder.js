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
      "Category",
      [
        { name: "Smartphones" },
        { name: "Tablets" },
        { name: "Smartwatches" },
        { name: "Accessories" },
        { name: "Chargers" },
        { name: "Earbuds" },
        { name: "Phone Cases" },
        { name: "Screen Protectors" },
        { name: "Power Banks" },
        { name: "Gaming Phones" },
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
