"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          title: "iPhone 14 Pro",
          capacity_id: 1, // ví dụ: 128GB
          ram_id: 3, // ví dụ: 6GB
          category_id: 1, // smartphones
          color_id: 1, // màu xanh dương
          stock: 50,
          discount: 5,
          price: 999.99,
          desc: "iPhone 14 Pro với màn hình Super Retina XDR và hệ thống camera tiên tiến.",
          is_active: true,
          slug: "iphone-14-pro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Samsung Galaxy S23",
          capacity_id: 2, // 256GB
          ram_id: 4, // 8GB
          category_id: 1,
          color_id: 2, // màu xám
          stock: 75,
          discount: 10,
          price: 899.99,
          desc: "Samsung Galaxy S23 với camera 50MP và khả năng sạc siêu nhanh.",
          is_active: true,
          slug: "samsung-galaxy-s23",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Google Pixel 7",
          capacity_id: 1, // 128GB
          ram_id: 3,
          category_id: 1,
          color_id: 3, // màu bạc
          stock: 40,
          discount: 8,
          price: 799.99,
          desc: "Google Pixel 7 với công nghệ AI và bộ xử lý Tensor G2.",
          is_active: false,
          slug: "google-pixel-7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "OnePlus 11",
          capacity_id: 3, // 512GB
          ram_id: 5, // 12GB
          category_id: 1,
          color_id: 4, // màu đen
          stock: 30,
          discount: 12,
          price: 699.99,
          desc: "OnePlus 11 với hiệu năng mạnh mẽ và sạc siêu tốc 100W.",
          is_active: true,
          slug: "oneplus-11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Xiaomi Mi 11",
          capacity_id: 2,
          ram_id: 4,
          category_id: 1,
          color_id: 1, // màu xanh
          stock: 60,
          discount: 7,
          price: 649.99,
          desc: "Xiaomi Mi 11 với màn hình AMOLED 120Hz và thiết kế nổi bật.",
          is_active: true,
          slug: "xiaomi-mi-11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sony Xperia 1 IV",
          capacity_id: 3,
          ram_id: 4,
          category_id: 1,
          color_id: 2, // màu xám
          stock: 45,
          discount: 15,
          price: 999.99,
          desc: "Sony Xperia 1 IV với khả năng quay video chuyên nghiệp và màn hình OLED 4K.",
          is_active: false,
          slug: "sony-xperia-1-iv",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Oppo Find X5 Pro",
          capacity_id: 2,
          ram_id: 5,
          category_id: 1,
          color_id: 4, // màu đen
          stock: 55,
          discount: 10,
          price: 899.99,
          desc: "Oppo Find X5 Pro với công nghệ Hasselblad và sạc không dây nhanh.",
          is_active: true,
          slug: "oppo-find-x5-pro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Realme GT 2 Pro",
          capacity_id: 1,
          ram_id: 4,
          category_id: 1,
          color_id: 3, // màu bạc
          stock: 85,
          discount: 20,
          price: 599.99,
          desc: "Realme GT 2 Pro với màn hình QHD+ và chip Snapdragon 8 Gen 1.",
          is_active: true,
          slug: "realme-gt-2-pro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Honor Magic4 Pro",
          capacity_id: 2,
          ram_id: 5,
          category_id: 1,
          color_id: 4, // màu đen
          stock: 70,
          discount: 8,
          price: 799.99,
          desc: "Honor Magic4 Pro với công nghệ AI vượt trội và pin dung lượng cao.",
          is_active: false,
          slug: "honor-magic4-pro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Asus ROG Phone 6",
          capacity_id: 3,
          ram_id: 6, // 16GB
          category_id: 1,
          color_id: 5, // màu đỏ
          stock: 20,
          discount: 18,
          price: 1099.99,
          desc: "Asus ROG Phone 6 với hiệu năng tối ưu cho gaming và màn hình AMOLED 165Hz.",
          is_active: true,
          slug: "asus-rog-phone-6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
