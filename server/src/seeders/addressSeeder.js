"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Address",
      [
        {
          user_id: 1,
          name:"Phạm Quốc Hoàng",
          house_address: "123 Nguyễn Văn Linh",
          ward: "Hòa Cường Bắc",
          district: "Hải Châu",
          city: "Đà Nẵng",
          phone_number: "0123456789",
          default: true
        },
        {
          user_id: 1,
          name:"Phạm Quốc Hoàng 2",
          house_address: "456 Đường 2/9",
          ward: "Hòa Cường Nam",
          district: "Hải Châu",
          city: "Đà Nẵng",
          phone_number: "0987654321",
          default: false
        },
        {
          user_id: 1,
          name:"Phạm Quốc Hoàng 3",
          house_address: "789 Lê Duẩn",
          ward: "Thạch Thang",
          district: "Hải Châu",
          city: "Đà Nẵng",
          phone_number: "0912345678",
          default: false
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Address", null, {});
  },
};
