"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        // ----------- smartphone -----------
        // Apple
        {
          id: 1,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 1,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-black',
          createdAt: '2024-10-29 16:08:04',
          updatedAt: '2024-10-29 16:08:04',
        },
        {
          id: 2,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 9,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-green',
          createdAt: '2024-10-29 16:08:37',
          updatedAt: '2024-10-29 16:08:37',
        },
        {
          id: 3,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 10,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-purple',
          createdAt: '2024-10-29 16:09:18',
          updatedAt: '2024-10-29 16:09:18',
        },
        {
          id: 4,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 8,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-red',
          createdAt: '2024-10-29 16:10:09',
          updatedAt: '2024-10-29 16:10:09',
        },
        {
          id: 5,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 2,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-white',
          createdAt: '2024-10-29 16:11:03',
          updatedAt: '2024-10-29 16:11:03',
        },
        {
          id: 6,
          title: 'iPhone 11',
          category_id: 1,
          ram_id: 4,
          capacity_id: 1,
          color_id: 16,
          stock: 100,
          discount: 25,
          price: 11990000,
          is_active: 1,
          slug: 'iphone-11-smartphone-4gb-64gb-yellow',
          createdAt: '2024-10-29 16:11:54',
          updatedAt: '2024-10-29 16:11:54',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
