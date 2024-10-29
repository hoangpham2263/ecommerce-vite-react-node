"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Color",
      [
        { name: "Black", color_code: "#000000" },
        { name: "White", color_code: "#FFFFFF" },
        { name: "Silver", color_code: "#C0C0C0" },
        { name: "Space Gray", color_code: "#4B4B4B" },
        { name: "Gold", color_code: "#FFD700" },
        { name: "Rose Gold", color_code: "#B76E79" },
        { name: "Midnight Blue", color_code: "#191970" },
        { name: "Red", color_code: "#FF0000" },
        { name: "Green", color_code: "#008000" },
        { name: "Purple", color_code: "#800080" },
        { name: "Blue", color_code: "#0000FF" },
        { name: "Pink", color_code: "#FFC0CB" },
        { name: "Graphite", color_code: "#333333" },
        { name: "Pacific Blue", color_code: "#1CA9C9" },
        { name: "Starlight", color_code: "#F5F5DC" },
        { name: "Yellow", color_code: "#FFFF00" },
        { name: "Teal", color_code: "#008080" },
        { name: "Coral", color_code: "#FF7F50" },
        { name: "Lavender", color_code: "#E6E6FA" },
        { name: "Mint Green", color_code: "#98FF98" },
        { name: "Chocolate", color_code: "#7B3F00" },
        { name: "Navy Blue", color_code: "#000080" },
        { name: "Light Gray", color_code: "#D3D3D3" },
        { name: "Dark Green", color_code: "#005700" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Color', null, {});
  },
};
