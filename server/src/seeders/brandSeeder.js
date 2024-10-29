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
        // smartphone
        { name: "Apple", category_id: 1 },
        { name: "Samsung", category_id: 1 },
        { name: "Huawei", category_id: 1 },
        { name: "Xiaomi", category_id: 1 },
        { name: "Oppo", category_id: 1 },
        { name: "Vivo", category_id: 1 },

        // tablet
        { name: "Dell", category_id: 2 },
        { name: "Lenovo", category_id: 2 },
        { name: "Asus", category_id: 2 },
        { name: "Apple", category_id: 2 },
        { name: "Samsung", category_id: 2 },
        { name: "Huawei", category_id: 2 },

        // laptop
        { name: "Dell", category_id: 3 },
        { name: "Lenovo", category_id: 3 },
        { name: "MacBook", category_id: 3 },
        { name: "HP", category_id: 3 },
        { name: "Acer", category_id: 3 },
        { name: "MSI", category_id: 3 },

        // watch
        { name: "Apple", category_id: 4 },
        { name: "Lenovo", category_id: 4 },
        { name: "Garmin", category_id: 4 },
        { name: "Fossil", category_id: 4 },
        { name: "Casio", category_id: 4 },
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
