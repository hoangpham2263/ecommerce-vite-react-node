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
      "Version",
      [
        // ----------- smartphone -----------
        // Thương hiệu Apple
        { name: "iPhone 13", brand_id: 1 },       // Apple
        { name: "iPhone 14", brand_id: 1 },       // Apple
        { name: "iPhone 15", brand_id: 1 },       // Apple
        { name: "iPhone SE (2022)", brand_id: 1 }, // Apple
        { name: "iPhone 12", brand_id: 1 },       // Apple

        // Thương hiệu Samsung
        { name: "Galaxy S22", brand_id: 2 },      // Samsung
        { name: "Galaxy S22 Ultra", brand_id: 2 }, // Samsung
        { name: "Galaxy Z Fold3", brand_id: 2 },  // Samsung
        { name: "Galaxy A53", brand_id: 2 },      // Samsung
        { name: "Galaxy A73", brand_id: 2 },      // Samsung
        { name: "Galaxy S23", brand_id: 2 },      // Samsung
        { name: "Galaxy Z Flip4", brand_id: 2 },  // Samsung

        // Thương hiệu Huawei
        { name: "Mate 40", brand_id: 3 },         // Huawei
        { name: "Mate 50", brand_id: 3 },         // Huawei
        { name: "P50 Pro", brand_id: 3 },         // Huawei
        { name: "Nova 9", brand_id: 3 },          // Huawei
        { name: "P60", brand_id: 3 },              // Huawei
        { name: "P40 Pro", brand_id: 3 },          // Huawei

        // Thương hiệu Xiaomi
        { name: "Mi 11", brand_id: 4 },           // Xiaomi
        { name: "Redmi Note 10", brand_id: 4 },   // Xiaomi
        { name: "Poco F3", brand_id: 4 },         // Xiaomi
        { name: "Mi 12", brand_id: 4 },           // Xiaomi
        { name: "Redmi K40", brand_id: 4 },       // Xiaomi
        { name: "Mi 11T Pro", brand_id: 4 },      // Xiaomi

        // Thương hiệu Oppo
        { name: "Find X3 Pro", brand_id: 5 },     // Oppo
        { name: "Reno 5", brand_id: 5 },          // Oppo
        { name: "A74", brand_id: 5 },             // Oppo
        { name: "Find N", brand_id: 5 },          // Oppo
        { name: "Reno 8", brand_id: 5 },          // Oppo

        // Thương hiệu Vivo
        { name: "X60 Pro", brand_id: 6 },         // Vivo
        { name: "V21", brand_id: 6 },             // Vivo
        { name: "Y20", brand_id: 6 },             // Vivo
        { name: "X70 Pro", brand_id: 6 },         // Vivo
        { name: "V25", brand_id: 6 },             // Vivo

        // ----------- tablet -----------
        // Thương hiệu Dell
        { name: "Dell XPS 13", brand_id: 7 },         // Dell
        { name: "Dell Inspiron 15", brand_id: 7 },    // Dell
        { name: "Dell Latitude 7420", brand_id: 7 },   // Dell
        { name: "Dell G7 7700", brand_id: 7 },         // Dell
        { name: "Dell Venue 8", brand_id: 7 },         // Dell

        // Thương hiệu Lenovo
        { name: "Lenovo Tab P11", brand_id: 8 },       // Lenovo
        { name: "Lenovo Yoga Tab 13", brand_id: 8 },   // Lenovo
        { name: "Lenovo Tab M10", brand_id: 8 },       // Lenovo
        { name: "Lenovo Tab P11 Pro", brand_id: 8 },    // Lenovo
        { name: "Lenovo Smart Tab M10", brand_id: 8 },  // Lenovo

        // Thương hiệu Asus
        { name: "Asus ZenPad 3S 10", brand_id: 9 },     // Asus
        { name: "Asus ROG Flow Z13", brand_id: 9 },     // Asus
        { name: "Asus Transformer Mini", brand_id: 9 },  // Asus
        { name: "Asus VivoTab", brand_id: 9 },           // Asus
        { name: "Asus ZenPad 10", brand_id: 9 },         // Asus

        // Thương hiệu Apple
        { name: "iPad Pro (11-inch)", brand_id: 10 },    // Apple
        { name: "iPad Pro (12.9-inch)", brand_id: 10 },  // Apple
        { name: "iPad Air (2022)", brand_id: 10 },       // Apple
        { name: "iPad (10th generation)", brand_id: 10 }, // Apple
        { name: "iPad Mini (2021)", brand_id: 10 },      // Apple

        // Thương hiệu Samsung
        { name: "Galaxy Tab S8", brand_id: 11 },         // Samsung
        { name: "Galaxy Tab S8+", brand_id: 11 },        // Samsung
        { name: "Galaxy Tab S7 FE", brand_id: 11 },      // Samsung
        { name: "Galaxy Tab A8", brand_id: 11 },         // Samsung
        { name: "Galaxy Tab Active3", brand_id: 11 },    // Samsung

        // Thương hiệu Huawei
        { name: "Huawei MatePad 11", brand_id: 12 },     // Huawei
        { name: "Huawei MatePad Pro", brand_id: 12 },     // Huawei
        { name: "Huawei MediaPad M6", brand_id: 12 },    // Huawei
        { name: "Huawei MatePad T10", brand_id: 12 },    // Huawei
        { name: "Huawei MatePad T10s", brand_id: 12 },   // Huawei

        // ----------- laptop -----------
        // Thương hiệu Dell
        { name: "Dell XPS 13", brand_id: 13 },           // Dell
        { name: "Dell Inspiron 15", brand_id: 13 },       // Dell
        { name: "Dell Latitude 7420", brand_id: 13 },     // Dell
        { name: "Dell G15", brand_id: 13 },                // Dell
        { name: "Dell Alienware m15", brand_id: 13 },     // Dell

        // Thương hiệu Lenovo
        { name: "Lenovo ThinkPad X1 Carbon", brand_id: 14 }, // Lenovo
        { name: "Lenovo Yoga 9i", brand_id: 14 },            // Lenovo
        { name: "Lenovo Legion 5", brand_id: 14 },           // Lenovo
        { name: "Lenovo IdeaPad 3", brand_id: 14 },          // Lenovo
        { name: "Lenovo ThinkBook 14", brand_id: 14 },       // Lenovo

        // Thương hiệu MacBook
        { name: "MacBook Air (M1)", brand_id: 15 },          // MacBook
        { name: "MacBook Air (M2)", brand_id: 15 },          // MacBook
        { name: "MacBook Pro (13-inch)", brand_id: 15 },     // MacBook
        { name: "MacBook Pro (14-inch)", brand_id: 15 },     // MacBook
        { name: "MacBook Pro (16-inch)", brand_id: 15 },     // MacBook

        // Thương hiệu HP
        { name: "HP Spectre x360", brand_id: 16 },           // HP
        { name: "HP Pavilion 15", brand_id: 16 },            // HP
        { name: "HP Envy 13", brand_id: 16 },                // HP
        { name: "HP Omen 15", brand_id: 16 },                // HP
        { name: "HP ProBook 450", brand_id: 16 },            // HP

        // Thương hiệu Acer
        { name: "Acer Swift 3", brand_id: 17 },              // Acer
        { name: "Acer Aspire 5", brand_id: 17 },             // Acer
        { name: "Acer Predator Helios 300", brand_id: 17 },  // Acer
        { name: "Acer Chromebook 14", brand_id: 17 },        // Acer
        { name: "Acer ConceptD 7", brand_id: 17 },           // Acer

        // Thương hiệu MSI
        { name: "MSI Stealth 15M", brand_id: 18 },           // MSI
        { name: "MSI GS66 Stealth", brand_id: 18 },          // MSI
        { name: "MSI GF63 Thin", brand_id: 18 },             // MSI
        { name: "MSI Creator 15", brand_id: 18 },            // MSI
        { name: "MSI Alpha 15", brand_id: 18 },              // MSI

        // ----------- watch -----------
        // Thương hiệu Apple
        { name: "Apple Watch Series 8", brand_id: 19 },      // Apple
        { name: "Apple Watch SE (2nd Gen)", brand_id: 19 },  // Apple
        { name: "Apple Watch Ultra 2", brand_id: 19 },        // Apple
        { name: "Apple Watch Series 7", brand_id: 19 },       // Apple
        { name: "Apple Watch Series 6", brand_id: 19 },       // Apple

        // Thương hiệu Lenovo
        { name: "Lenovo Smart Clock 2", brand_id: 20 },       // Lenovo
        { name: "Lenovo Smart Band 2", brand_id: 20 },        // Lenovo
        { name: "Lenovo Watch 9", brand_id: 20 },             // Lenovo
        { name: "Lenovo Smartwatch", brand_id: 20 },          // Lenovo

        // Thương hiệu Garmin
        { name: "Garmin Fenix 7", brand_id: 21 },             // Garmin
        { name: "Garmin Forerunner 255", brand_id: 21 },      // Garmin
        { name: "Garmin Venu 2", brand_id: 21 },              // Garmin
        { name: "Garmin Instinct 2", brand_id: 21 },          // Garmin
        { name: "Garmin Lily", brand_id: 21 },                // Garmin

        // Thương hiệu Fossil
        { name: "Fossil Gen 6", brand_id: 22 },                // Fossil
        { name: "Fossil Hybrid HR", brand_id: 22 },           // Fossil
        { name: "Fossil Gen 5", brand_id: 22 },                // Fossil
        { name: "Fossil Q Explorist", brand_id: 22 },         // Fossil
        { name: "Fossil Q Venture", brand_id: 22 },            // Fossil

        // Thương hiệu Casio
        { name: "Casio G-Shock GA-2100", brand_id: 23 },      // Casio
        { name: "Casio G-Shock DW5600", brand_id: 23 },       // Casio
        { name: "Casio Pro Trek Smart", brand_id: 23 },       // Casio
        { name: "Casio Baby-G", brand_id: 23 },               // Casio
        { name: "Casio A168WA", brand_id: 23 },               // Casio
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
