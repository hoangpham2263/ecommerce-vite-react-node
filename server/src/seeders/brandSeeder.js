"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Brand",
      [
        // ----- smartphone -----
        { id: 1, name: "iPhone", category_id: 1 },
        { id: 2, name: "Samsung", category_id: 1 },

        // ----- tablet -----
        { id: 3, name: "iPad", category_id: 2 },
        { id: 4, name: "Lenovo", category_id: 2 },
        { id: 5, name: "Samsung", category_id: 2 },

        // ----- laptop -----
        { id: 6, name: "MacBook", category_id: 3 },
        { id: 7, name: "Lenovo", category_id: 3 },

        // ----- watch -----
        { id: 8, name: "Apple", category_id: 4 },
        { id: 9, name: "Lenovo", category_id: 4 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brand", null, {});
  },
};
