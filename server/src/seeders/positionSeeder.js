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
      "Position",
      [
        {
          key_position: 1,
          name: "admin",
          desc: "Chủ cửa hàng",
          is_active: true,
          is_master: true
        },
        {
          key_position: 2,
          name: "staff",
          desc: "Nhân viên của cửa hàng",
          is_active: true,
          is_master: false
        },
        {
          key_position: 3,
          name: "customer",
          desc: "Khách hàng đăng ký tài khoản thành viên",
          is_active: true,
          is_master: false
        },
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
