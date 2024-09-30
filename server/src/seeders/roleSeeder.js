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
        // User
        {
          key_role: 1,
          name: "Read User",
        },
        {
          key_role: 2,
          name: "Create User",
        },
        {
          key_role: 3,
          name: "Update User",
        },
        {
          key_role: 4,
          name: "Delete User",
        },
        // Position
        {
          key_role: 5,
          name: "Read Position",
        },
        {
          key_role: 6,
          name: "Create Position",
        },
        {
          key_role: 7,
          name: "Update Position",
        },
        {
          key_role: 8,
          name: "Delete Position",
        },
        // Position Role
        {
          key_role: 9,
          name: "Read Position Role",
        },
        {
          key_role: 10,
          name: "Create Position Role",
        },
        {
          key_role: 11,
          name: "Update Position Role",
        },
        {
          key_role: 12,
          name: "Delete Position Role",
        },
        // Role
        {
          key_role: 13,
          name: "Read Role",
        },
        {
          key_role: 14,
          name: "Create Role",
        },
        {
          key_role: 15,
          name: "Update Role",
        },
        {
          key_role: 16,
          name: "Delete Role",
        },
        // // Product
        // {
        //   key_role: 17,
        //   name: "/product/read",
        // },
        // {
        //   key_role: 18,
        //   name: "/product/create",
        // },
        // {
        //   key_role: 19,
        //   name: "/product/update",
        // },
        // {
        //   key_role: 20,
        //   name: "/product/delete",
        // },
        // // Categories
        // {
        //   key_role: 21,
        //   name: "/categories/read",
        // },
        // {
        //   key_role: 22,
        //   name: "/categories/create",
        // },
        // {
        //   key_role: 23,
        //   name: "/categories/update",
        // },
        // {
        //   key_role: 24,
        //   name: "/categories/delete",
        // },
        // // Brand
        // {
        //   key_role: 25,
        //   name: "/brand/read",
        // },
        // {
        //   key_role: 26,
        //   name: "/brand/create",
        // },
        // {
        //   key_role: 27,
        //   name: "/brand/update",
        // },
        // {
        //   key_role: 28,
        //   name: "/brand/delete",
        // },
        // // Cart
        // {
        //   key_role: 29,
        //   name: "/cart/read",
        // },
        // {
        //   key_role: 30,
        //   name: "/cart/create",
        // },
        // {
        //   key_role: 31,
        //   name: "/cart/update",
        // },
        // {
        //   key_role: 32,
        //   name: "/cart/delete",
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
