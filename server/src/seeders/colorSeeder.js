"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Color",
      [
        { id: 1, name: "Black", color_code: "#000000" },
        { id: 2, name: "White", color_code: "#FFFFFF" },
        { id: 3, name: "Silver", color_code: "#C0C0C0" },
        { id: 4, name: "Space Gray", color_code: "#4B4B4B" },
        { id: 5, name: "Gold", color_code: "#FFD700" },
        { id: 6, name: "Rose Gold", color_code: "#B76E79" },
        { id: 7, name: "Midnight Blue", color_code: "#191970" },
        { id: 8, name: "Red", color_code: "#FF0000" },
        { id: 9, name: "Green", color_code: "#008000" },
        { id: 10, name: "Purple", color_code: "#800080" },
        { id: 11, name: "Blue", color_code: "#0000FF" },
        { id: 12, name: "Pink", color_code: "#FFC0CB" },
        { id: 13, name: "Graphite", color_code: "#333333" },
        { id: 14, name: "Pacific Blue", color_code: "#1CA9C9" },
        { id: 15, name: "Starlight", color_code: "#F5F5DC" },
        { id: 16, name: "Yellow", color_code: "#FFFF00" },
        { id: 17, name: "Teal", color_code: "#008080" },
        { id: 18, name: "Coral", color_code: "#FF7F50" },
        { id: 19, name: "Lavender", color_code: "#E6E6FA" },
        { id: 20, name: "Mint Green", color_code: "#98FF98" },
        { id: 21, name: "Chocolate", color_code: "#7B3F00" },
        { id: 22, name: "Navy Blue", color_code: "#000080" },
        { id: 23, name: "Light Gray", color_code: "#D3D3D3" },
        { id: 24, name: "Dark Green", color_code: "#005700" },
        { id: 25, name: "Grey", color_code: "#808080" }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Color', null, {});
  },
};
