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
      "Version",
      [
        { name: "iPhone 13", brand_id: 1 },       // Apple
        { name: "iPhone 14", brand_id: 1 },       // Apple
        { name: "Galaxy S22", brand_id: 2 },      // Samsung
        { name: "Galaxy Z Fold3", brand_id: 2 },  // Samsung
        { name: "Mate 40", brand_id: 3 },         // Huawei
        { name: "Mate 50", brand_id: 3 },         // Huawei
        { name: "XPS 13", brand_id: 4 },          // Dell
        { name: "Yoga Slim", brand_id: 5 },       // Lenovo
        { name: "ROG Phone", brand_id: 6 },       // Asus
        { name: "Fenix 6", brand_id: 7 },         // Garmin
        { name: "Versa 3", brand_id: 8 },         // Fitbit
        { name: "WF-1000XM4", brand_id: 9 },      // Sony
        { name: "Soundcore Liberty", brand_id: 10 }, // Anker
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
