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
        { id: 3, name: "Huawei", category_id: 1 },
        { id: 4, name: "Xiaomi", category_id: 1 },
        { id: 5, name: "Oppo", category_id: 1 },
        { id: 6, name: "Vivo", category_id: 1 },

        // ----- tablet -----
        { id: 7, name: "Dell", category_id: 2 },
        { id: 8, name: "Lenovo", category_id: 2 },
        { id: 9, name: "Asus", category_id: 2 },
        { id: 10, name: "Apple", category_id: 2 },
        { id: 11, name: "Samsung", category_id: 2 },
        { id: 12, name: "Huawei", category_id: 2 },

        // ----- laptop -----
        { id: 13, name: "Dell", category_id: 3 },
        { id: 14, name: "Lenovo", category_id: 3 },
        { id: 15, name: "MacBook", category_id: 3 },
        { id: 16, name: "HP", category_id: 3 },
        { id: 17, name: "Acer", category_id: 3 },
        { id: 18, name: "MSI", category_id: 3 },

        // ----- watch -----
        { id: 19, name: "Apple", category_id: 4 },
        { id: 20, name: "Lenovo", category_id: 4 },
        { id: 21, name: "Garmin", category_id: 4 },
        { id: 22, name: "Fossil", category_id: 4 },
        { id: 23, name: "Casio", category_id: 4 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brand", null, {});
  },
};
