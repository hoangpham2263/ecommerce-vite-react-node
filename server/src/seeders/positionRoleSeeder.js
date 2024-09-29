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
        // staff
        {
          position_id: 2,
          role_id: 1,
        },
        {
          position_id: 2,
          role_id: 2,
        },
        {
          position_id: 2,
          role_id: 3,
        },
        {
          position_id: 2,
          role_id: 4,
        },
        {
          position_id: 2,
          role_id: 5,
        },
        {
          position_id: 2,
          role_id: 6,
        },
        {
          position_id: 2,
          role_id: 7,
        },
        {
          position_id: 2,
          role_id: 8,
        },
        {
          position_id: 2,
          role_id: 9,
        },
        {
          position_id: 2,
          role_id: 10,
        },
        {
          position_id: 2,
          role_id: 11,
        },
        {
          position_id: 2,
          role_id: 12,
        },
        {
          position_id: 2,
          role_id: 13,
        },
        {
          position_id: 2,
          role_id: 14,
        },
        {
          position_id: 2,
          role_id: 15,
        },
        {
          position_id: 2,
          role_id: 16,
        },
        // {
        //   position_id: 2,
        //   role_id: 17,
        // },
        // {
        //   position_id: 2,
        //   role_id: 18,
        // },
        // {
        //   position_id: 2,
        //   role_id: 19,
        // },
        // {
        //   position_id: 2,
        //   role_id: 20,
        // },
        // {
        //   position_id: 2,
        //   role_id: 21,
        // },
        // {
        //   position_id: 2,
        //   role_id: 22,
        // },
        // {
        //   position_id: 2,
        //   role_id: 23,
        // },
        // {
        //   position_id: 2,
        //   role_id: 24,
        // },
        // {
        //   position_id: 2,
        //   role_id: 25,
        // },
        // {
        //   position_id: 2,
        //   role_id: 26,
        // },
        // {
        //   position_id: 2,
        //   role_id: 27,
        // },
        // {
        //   position_id: 2,
        //   role_id: 28,
        // },
        // {
        //   position_id: 2,
        //   role_id: 29,
        // },
        // {
        //   position_id: 2,
        //   role_id: 30,
        // },
        // {
        //   position_id: 2,
        //   role_id: 31,
        // },
        // {
        //   position_id: 2,
        //   role_id: 32,
        // },

        // customer
        // {
        //   position_id: 3,
        //   role_id: 3,
        // },
        // {
        //   position_id: 3,
        //   role_id: 29,
        // },
        // {
        //   position_id: 3,
        //   role_id: 30,
        // },
        // {
        //   position_id: 3,
        //   role_id: 31,
        // },
        // {
        //   position_id: 3,
        //   role_id: 32,
        // },
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
