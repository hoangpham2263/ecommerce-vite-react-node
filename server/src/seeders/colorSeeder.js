"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Color",
      [
        { id: 1, name: "Đen", color_code: "#000000" },
        { id: 2, name: "Trắng", color_code: "#FFFFFF" },
        { id: 3, name: "Bạc", color_code: "#C0C0C0" },
        { id: 4, name: "Đỏ", color_code: "#FF0000" },
        { id: 5, name: "Xanh Lá", color_code: "#008000" },
        { id: 6, name: "Tím", color_code: "#800080" },
        { id: 7, name: "Xanh Dương", color_code: "#0000FF" },
        { id: 8, name: "Vàng", color_code: "#FFFF00" },
        { id: 9, name: "Xám", color_code: "#808080" },
        { id: 10, name: "Hồng", color_code: "#FFC0CB" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Color', null, {});
  },
};
