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
      "Role",
      [
        { key_role: 1, name: "account", },          // account
        { key_role: 2, name: "position", },         // position
        { key_role: 3, name: "position role", },    // position role
        { key_role: 4, name: "role", },             // role role
        { key_role: 5, name: "product", },          // product
        { key_role: 6, name: "config", },           // config"
        { key_role: 7, name: "category", },         // category
        { key_role: 8, name: "brand", },            // brand
        { key_role: 9, name: "version", },          // version
        { key_role: 10, name: "color", },           // color
        { key_role: 11, name: "capacity", },        // capacity
        { key_role: 12, name: "ram", },             // ram
        { key_role: 13, name: "image", },           // image
        { key_role: 14, name: "address", },         // address
        { key_role: 15, name: "cart", },            // cart
        { key_role: 16, name: "order", },           // order
        { key_role: 17, name: "order line", },      // order line
        { key_role: 18, name: "assessment", },      // assessment

        { key_role: 99, name: "is customer", },      // is customer
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
