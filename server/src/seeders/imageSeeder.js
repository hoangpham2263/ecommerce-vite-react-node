"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Image", [
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210378/ecommerce/kyrk8t71xebb8a44d3em.jpg",
        file_name: "iphone-14-pro-blue.jpg",
        product_id: 1,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210377/ecommerce/oeha7pqq02baj4ga89wp.jpg",
        file_name: "iphone-13-blue.jpg",
        product_id: 1,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210377/ecommerce/g3asbhmxzwnjjl6hlaoz.jpg",
        file_name: "samsung-galaxy-s23-grey.jpg",
        product_id: 2,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210378/ecommerce/gonfymd56fmizztgamux.jpg",
        file_name: "samsung-galaxy-z-flip-4-grey.jpg",
        product_id: 2,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210378/ecommerce/q9sxwzuabw73pnsjltco.jpg",
        file_name: "google-pixel-7-silver.jpg",
        product_id: 3,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210378/ecommerce/inifphjmkgfnbjo7dq31.jpg",
        file_name: "google-pixel-6-silver.jpg",
        product_id: 3,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210227/ecommerce/zx3gw6uinvnkc7zrd3j5.jpg",
        file_name: "oneplus-11.jpg",
        product_id: 4,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210228/ecommerce/xbmcqdh6b8p7sizkkima.jpg",
        file_name: "oneplus-10-pro.jpg",
        product_id: 4,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210229/ecommerce/qtmxxrnkrt16g084pzks.jpg",
        file_name: "xiaomi-12.jpg",
        product_id: 5,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210228/ecommerce/ppmqgmf5a4pxyjc4zkjo.jpg",
        file_name: "xiaomi-mi-11.jpg",
        product_id: 5,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210228/ecommerce/fuzhmda3ivbwhfzdvkbg.jpg",
        file_name: "sony-xperia-1-iv.jpg",
        product_id: 6,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210229/ecommerce/rhwz8gyb8s1ztilytmb5.jpg",
        file_name: "oppo-find-x5-pro.jpg",
        product_id: 7,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210229/ecommerce/smwmyvln5nmunan5iwwz.jpg",
        file_name: "realme-gt-2-pro.jpg",
        product_id: 8,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210227/ecommerce/lyol4lmz8kzow2qimtuu.jpg",
        file_name: "honor-x40.jpg",
        product_id: 9,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210228/ecommerce/nmglotwhaxfy9mhcqijz.jpg",
        file_name: "lenovo-legion.jpg",
        product_id: 10,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210229/ecommerce/uazsfm53x46edvjnzias.jpg",
        file_name: "zte-axon.jpg",
        product_id: 11,
      },
      {
        url: "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716210228/ecommerce/qve7flrvhwvvq9xlczna.jpg",
        file_name: "google-pixel-5.jpg",
        product_id: 12,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Image", null, {});
  },
};
