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
      "Order_Line",
      [
        { id: 1, name: "all", translated_name: "Tất cả" },
        { id: 2, name: "pending", translated_name: "Chờ thanh toán" },
        { id: 3, name: "shipping", translated_name: "Vận chuyển" },
        { id: 4, name: "delivered", translated_name: "Chờ giao hàng" },
        { id: 5, name: "completed", translated_name: "Hoàn thành" },
        { id: 6, name: "cancelled", translated_name: "Đã hủy" },
        { id: 7, name: "returned", translated_name: "Trả hàng/Hoàn tiền" },
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
