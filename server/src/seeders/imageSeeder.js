"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Image", [
      {
        id: 1,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218086/imageWebList/iphone%2011%20black%201.jpg.webp']),
        file_name: 'iphone 11 black 1.jpg',
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218088/imageWebList/iphone%2011%20black%202.jpg.webp']),
        file_name: 'iphone 11 black 2.jpg',
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218086/imageWebList/iphone%2011%20black%203.jpg.webp']),
        file_name: 'iphone 11 black 3.jpg',
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218120/imageWebList/iphone%2011%20green%201.webp.webp']),
        file_name: 'iphone 11 green 1.webp',
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218163/imageWebList/iphone%2011%20purple%201.webp.webp']),
        file_name: 'iphone 11 purple 1.webp',
        product_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218219/imageWebList/iphone%2011%20red%201.png.png']),
        file_name: 'iphone 11 red 1.png',
        product_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218214/imageWebList/iphone%2011%20red%202.webp.webp']),
        file_name: 'iphone 11 red 2.webp',
        product_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218214/imageWebList/iphone%2011%20red%203.jpg.jpg']),
        file_name: 'iphone 11 red 3.jpg',
        product_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218265/imageWebList/iphone%2011%20white%201.jpg.webp']),
        file_name: 'iphone 11 white 1.jpg',
        product_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218265/imageWebList/iphone%2011%20white%202.jpg.webp']),
        file_name: 'iphone 11 white 2.jpg',
        product_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218266/imageWebList/iphone%2011%20white%203.jpg.webp']),
        file_name: 'iphone 11 white 3.jpg',
        product_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        url: JSON.stringify(['https://res.cloudinary.com/dqhj1sukr/image/upload/v1730218317/imageWebList/iphone%2011%20yellow%201.webp.webp']),
        file_name: 'iphone 11 yellow 1.webp',
        product_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
