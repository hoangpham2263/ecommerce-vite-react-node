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
      "Color",
      [
        {
          name: "Black",
          color_code: "#000000",
        },
        {
          name: "White",
          color_code: "#FFFFFF",
        },
        {
          name: "Silver",
          color_code: "#C0C0C0",
        },
        {
          name: "Space Gray",
          color_code: "#4B4B4B",
        },
        {
          name: "Gold",
          color_code: "#FFD700",
        },
        {
          name: "Rose Gold",
          color_code: "#B76E79",
        },
        {
          name: "Midnight Blue",
          color_code: "#191970",
        },
        {
          name: "Red",
          color_code: "#FF0000",
        },
        {
          name: "Green",
          color_code: "#008000",
        },
        {
          name: "Purple",
          color_code: "#800080",
        },
        {
          name: "Blue",
          color_code: "#0000FF",
        },
        {
          name: "Pink",
          color_code: "#FFC0CB",
        },
        {
          name: "Graphite",
          color_code: "#333333",
        },
        {
          name: "Pacific Blue",
          color_code: "#1CA9C9",
        },
        {
          name: "Starlight",
          color_code: "#F5F5DC",
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
     * await queryInterface.bulkDelete('Color', null, {});
     */
    await queryInterface.bulkDelete('Color', null, {});
  },
};
