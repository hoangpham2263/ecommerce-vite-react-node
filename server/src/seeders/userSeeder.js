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
      "User",
      [
        { id: 1, full_name: "admin", username: "admin", password: "$2a$10$5yZspAQAyJ9N69LiSaNc6uo/qLH6g/0R6KwszTArSDIzfNZcK.lYi", gender: "male", is_active: true, is_verified: true, position_id: 1 },
        { id: 2, full_name: "guest", username: "guest", password: "$2a$10$7hbhAm8wX0I/dmAUc87VuOzzmCxdA9aeifhMrFR62blAYQhxTKwJW", gender: "male", is_active: true, is_verified: true, position_id: 3 },
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
