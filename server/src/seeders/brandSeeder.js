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
      "Brand",
      [
        { name: "Apple", category_id: 1 },      // Smartphones
        { name: "Samsung", category_id: 1 },    // Smartphones
        { name: "Huawei", category_id: 1 },     // Smartphones
        { name: "Dell", category_id: 2 },       // Tablets
        { name: "Lenovo", category_id: 2 },     // Tablets
        { name: "Asus", category_id: 2 },       // Tablets
        { name: "Garmin", category_id: 3 },     // Smartwatches
        { name: "Fitbit", category_id: 3 },     // Smartwatches
        { name: "Sony", category_id: 4 },       // Accessories
        { name: "Anker", category_id: 4 },      // Accessories
        { name: "Logitech", category_id: 4 },   // Accessories
        { name: "Belkin", category_id: 5 },     // Chargers
        { name: "Aukey", category_id: 5 },      // Chargers
        { name: "JBL", category_id: 6 },        // Earbuds
        { name: "Beats", category_id: 6 },      // Earbuds
        { name: "Spigen", category_id: 7 },     // Phone Cases
        { name: "OtterBox", category_id: 7 },   // Phone Cases
        { name: "ZAGG", category_id: 8 },       // Screen Protectors
        { name: "RAVPower", category_id: 9 },   // Power Banks
        { name: "Black Shark", category_id: 10 },// Gaming Phones
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
