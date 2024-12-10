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
        { PositionId: 2, RoleId: 1, },
        { PositionId: 2, RoleId: 2, },
        { PositionId: 2, RoleId: 3, },
        { PositionId: 2, RoleId: 4, },
        { PositionId: 2, RoleId: 5, },
        { PositionId: 2, RoleId: 6, },
        { PositionId: 2, RoleId: 7, },
        { PositionId: 2, RoleId: 8, },
        { PositionId: 2, RoleId: 9, },
        { PositionId: 2, RoleId: 10, },
        { PositionId: 2, RoleId: 11, },
        { PositionId: 2, RoleId: 12, },
        { PositionId: 2, RoleId: 13, },
        { PositionId: 2, RoleId: 14, },
        { PositionId: 2, RoleId: 15, },
        { PositionId: 2, RoleId: 16, },
        { PositionId: 2, RoleId: 17, },
        { PositionId: 2, RoleId: 18, },
        { PositionId: 2, RoleId: 99, },

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
