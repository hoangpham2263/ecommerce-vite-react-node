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
        // ----------- smartphone -----------
        // Apple
        { name: "11", brand_id: 1 },
        { name: "12", brand_id: 1 },
        { name: "12 Pro", brand_id: 1 },
        { name: "12 Pro Max", brand_id: 1 },
        { name: "13", brand_id: 1 },
        { name: "13 Pro", brand_id: 1 },
        { name: "13 Pro Max", brand_id: 1 },
        { name: "14", brand_id: 1 },
        { name: "14 Pro", brand_id: 1 },
        { name: "14 Pro Max", brand_id: 1 },
        { name: "15", brand_id: 1 },
        { name: "15 Pro", brand_id: 1 },
        { name: "15 Pro Max", brand_id: 1 },

        // Samsung
        { name: "Galaxy S22", brand_id: 2 },
        { name: "Galaxy S22 Ultra", brand_id: 2 },
        { name: "Galaxy Z Fold3", brand_id: 2 },
        { name: "Galaxy A53", brand_id: 2 },
        { name: "Galaxy A73", brand_id: 2 },
        { name: "Galaxy S23", brand_id: 2 },
        { name: "Galaxy Z Flip4", brand_id: 2 },

        // ----------- tablet -----------

        // Apple
        { name: "iPad Pro (11-inch)", brand_id: 3 },
        { name: "iPad Pro (12.9-inch)", brand_id: 3 },
        { name: "iPad Air (2022)", brand_id: 3 },
        { name: "iPad (10th generation)", brand_id: 3 },
        { name: "iPad Mini (2021)", brand_id: 3 },

        // Lenovo
        { name: "Lenovo Tab P11", brand_id: 4 },
        { name: "Lenovo Yoga Tab 13", brand_id: 4 },
        { name: "Lenovo Tab M10", brand_id: 4 },
        { name: "Lenovo Tab P11 Pro", brand_id: 4 },
        { name: "Lenovo Smart Tab M10", brand_id: 4 },

        // Samsung
        { name: "Galaxy Tab S8", brand_id: 5 },
        { name: "Galaxy Tab S8+", brand_id: 5 },
        { name: "Galaxy Tab S7 FE", brand_id: 5 },
        { name: "Galaxy Tab A8", brand_id: 5 },
        { name: "Galaxy Tab Active3", brand_id: 5 },

        // ----------- laptop -----------

        // MacBook
        { name: "MacBook Air (M1)", brand_id: 6 },
        { name: "MacBook Air (M2)", brand_id: 6 },
        { name: "MacBook Pro (13-inch)", brand_id: 6 },
        { name: "MacBook Pro (14-inch)", brand_id: 6 },
        { name: "MacBook Pro (16-inch)", brand_id: 6 },

        // Lenovo
        { name: "Lenovo ThinkPad X1 Carbon", brand_id: 7 },
        { name: "Lenovo Yoga 9i", brand_id: 7 },
        { name: "Lenovo Legion 5", brand_id: 7 },
        { name: "Lenovo IdeaPad 3", brand_id: 7 },
        { name: "Lenovo ThinkBook 14", brand_id: 7 },

        // ----------- watch -----------
        // Apple
        { name: "Apple Watch Series 8", brand_id: 8 },
        { name: "Apple Watch SE (2nd Gen)", brand_id: 8 },
        { name: "Apple Watch Ultra 2", brand_id: 8 },
        { name: "Apple Watch Series 7", brand_id: 8 },
        { name: "Apple Watch Series 6", brand_id: 8 },

        // Lenovo
        { name: "Lenovo Smart Clock 2", brand_id: 9 },
        { name: "Lenovo Smart Band 2", brand_id: 9 },
        { name: "Lenovo Watch 9", brand_id: 9 },
        { name: "Lenovo Smartwatch", brand_id: 9 },
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
