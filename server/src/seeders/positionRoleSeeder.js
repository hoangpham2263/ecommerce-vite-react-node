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
      "Position_Role",
      [
        // ---------- staff ----------
        { PositionId: 2, RoleId: 1, },        // account
        // { PositionId: 2, RoleId: 2, },        // position
        // { PositionId: 2, RoleId: 3, },        // position role
        // { PositionId: 2, RoleId: 4, },        // role
        { PositionId: 2, RoleId: 5, },        // product
        { PositionId: 2, RoleId: 6, },        // config"
        { PositionId: 2, RoleId: 7, },        // category
        { PositionId: 2, RoleId: 8, },        // brand
        { PositionId: 2, RoleId: 9, },        // version
        { PositionId: 2, RoleId: 10, },       // color
        { PositionId: 2, RoleId: 11, },       // capacity
        { PositionId: 2, RoleId: 12, },       // ram
        { PositionId: 2, RoleId: 13, },       // image
        { PositionId: 2, RoleId: 14, },       // address
        { PositionId: 2, RoleId: 15, },       // cart
        { PositionId: 2, RoleId: 16, },       // order
        { PositionId: 2, RoleId: 17, },       // order line
        { PositionId: 2, RoleId: 18, },       // assessment
        { PositionId: 2, RoleId: 99, },       // is customer

        // ---------- customer ----------
        { PositionId: 3, RoleId: 99, },
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
