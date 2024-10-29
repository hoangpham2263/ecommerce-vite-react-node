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
        // Apple
        { name: "iPhone 13", brand_id: 1 },
        { name: "iPhone 14", brand_id: 1 },
        { name: "iPhone 15", brand_id: 1 },
        { name: "iPhone SE (2022)", brand_id: 1 },
        { name: "iPhone 12", brand_id: 1 },

        // Samsung
        { name: "Galaxy S22", brand_id: 2 },
        { name: "Galaxy S22 Ultra", brand_id: 2 },
        { name: "Galaxy Z Fold3", brand_id: 2 },
        { name: "Galaxy A53", brand_id: 2 },
        { name: "Galaxy A73", brand_id: 2 },
        { name: "Galaxy S23", brand_id: 2 },
        { name: "Galaxy Z Flip4", brand_id: 2 },

        // Huawei
        { name: "Mate 40", brand_id: 3 },
        { name: "Mate 50", brand_id: 3 },
        { name: "P50 Pro", brand_id: 3 },
        { name: "Nova 9", brand_id: 3 },
        { name: "P60", brand_id: 3 },
        { name: "P40 Pro", brand_id: 3 },

        // Xiaomi
        { name: "Mi 11", brand_id: 4 },
        { name: "Redmi Note 10", brand_id: 4 },
        { name: "Poco F3", brand_id: 4 },
        { name: "Mi 12", brand_id: 4 },
        { name: "Redmi K40", brand_id: 4 },
        { name: "Mi 11T Pro", brand_id: 4 },

        // Oppo
        { name: "Find X3 Pro", brand_id: 5 },
        { name: "Reno 5", brand_id: 5 },
        { name: "A74", brand_id: 5 },
        { name: "Find N", brand_id: 5 },
        { name: "Reno 8", brand_id: 5 },

        // Vivo
        { name: "X60 Pro", brand_id: 6 },
        { name: "V21", brand_id: 6 },
        { name: "Y20", brand_id: 6 },
        { name: "X70 Pro", brand_id: 6 },
        { name: "V25", brand_id: 6 },

        // ----------- tablet -----------
        // Dell
        { name: "Dell XPS 13", brand_id: 7 },
        { name: "Dell Inspiron 15", brand_id: 7 },
        { name: "Dell Latitude 7420", brand_id: 7 },
        { name: "Dell G7 7700", brand_id: 7 },
        { name: "Dell Venue 8", brand_id: 7 },

        // Lenovo
        { name: "Lenovo Tab P11", brand_id: 8 },
        { name: "Lenovo Yoga Tab 13", brand_id: 8 },
        { name: "Lenovo Tab M10", brand_id: 8 },
        { name: "Lenovo Tab P11 Pro", brand_id: 8 },
        { name: "Lenovo Smart Tab M10", brand_id: 8 },

        // Asus
        { name: "Asus ZenPad 3S 10", brand_id: 9 },
        { name: "Asus ROG Flow Z13", brand_id: 9 },
        { name: "Asus Transformer Mini", brand_id: 9 },
        { name: "Asus VivoTab", brand_id: 9 },
        { name: "Asus ZenPad 10", brand_id: 9 },

        // Apple
        { name: "iPad Pro (11-inch)", brand_id: 10 },
        { name: "iPad Pro (12.9-inch)", brand_id: 10 },
        { name: "iPad Air (2022)", brand_id: 10 },
        { name: "iPad (10th generation)", brand_id: 10 },
        { name: "iPad Mini (2021)", brand_id: 10 },

        // Samsung
        { name: "Galaxy Tab S8", brand_id: 11 },
        { name: "Galaxy Tab S8+", brand_id: 11 },
        { name: "Galaxy Tab S7 FE", brand_id: 11 },
        { name: "Galaxy Tab A8", brand_id: 11 },
        { name: "Galaxy Tab Active3", brand_id: 11 },

        // Huawei
        { name: "Huawei MatePad 11", brand_id: 12 },
        { name: "Huawei MatePad Pro", brand_id: 12 },
        { name: "Huawei MediaPad M6", brand_id: 12 },
        { name: "Huawei MatePad T10", brand_id: 12 },
        { name: "Huawei MatePad T10s", brand_id: 12 },

        // ----------- laptop -----------
        // Dell
        { name: "Dell XPS 13", brand_id: 13 },
        { name: "Dell Inspiron 15", brand_id: 13 },
        { name: "Dell Latitude 7420", brand_id: 13 },
        { name: "Dell G15", brand_id: 13 },
        { name: "Dell Alienware m15", brand_id: 13 },

        // Lenovo
        { name: "Lenovo ThinkPad X1 Carbon", brand_id: 14 },
        { name: "Lenovo Yoga 9i", brand_id: 14 },
        { name: "Lenovo Legion 5", brand_id: 14 },
        { name: "Lenovo IdeaPad 3", brand_id: 14 },
        { name: "Lenovo ThinkBook 14", brand_id: 14 },

        // MacBook
        { name: "MacBook Air (M1)", brand_id: 15 },
        { name: "MacBook Air (M2)", brand_id: 15 },
        { name: "MacBook Pro (13-inch)", brand_id: 15 },
        { name: "MacBook Pro (14-inch)", brand_id: 15 },
        { name: "MacBook Pro (16-inch)", brand_id: 15 },

        // HP
        { name: "HP Spectre x360", brand_id: 16 },
        { name: "HP Pavilion 15", brand_id: 16 },
        { name: "HP Envy 13", brand_id: 16 },
        { name: "HP Omen 15", brand_id: 16 },
        { name: "HP ProBook 450", brand_id: 16 },

        // Acer
        { name: "Acer Swift 3", brand_id: 17 },
        { name: "Acer Aspire 5", brand_id: 17 },
        { name: "Acer Predator Helios 300", brand_id: 17 },
        { name: "Acer Chromebook 14", brand_id: 17 },
        { name: "Acer ConceptD 7", brand_id: 17 },

        // MSI
        { name: "MSI Stealth 15M", brand_id: 18 },
        { name: "MSI GS66 Stealth", brand_id: 18 },
        { name: "MSI GF63 Thin", brand_id: 18 },
        { name: "MSI Creator 15", brand_id: 18 },
        { name: "MSI Alpha 15", brand_id: 18 },

        // ----------- watch -----------
        // Apple
        { name: "Apple Watch Series 8", brand_id: 19 },
        { name: "Apple Watch SE (2nd Gen)", brand_id: 19 },
        { name: "Apple Watch Ultra 2", brand_id: 19 },
        { name: "Apple Watch Series 7", brand_id: 19 },
        { name: "Apple Watch Series 6", brand_id: 19 },

        // Lenovo
        { name: "Lenovo Smart Clock 2", brand_id: 20 },
        { name: "Lenovo Smart Band 2", brand_id: 20 },
        { name: "Lenovo Watch 9", brand_id: 20 },
        { name: "Lenovo Smartwatch", brand_id: 20 },

        // Garmin
        { name: "Garmin Fenix 7", brand_id: 21 },
        { name: "Garmin Forerunner 255", brand_id: 21 },
        { name: "Garmin Venu 2", brand_id: 21 },
        { name: "Garmin Instinct 2", brand_id: 21 },
        { name: "Garmin Lily", brand_id: 21 },

        // Fossil
        { name: "Fossil Gen 6", brand_id: 22 },
        { name: "Fossil Hybrid HR", brand_id: 22 },
        { name: "Fossil Gen 5", brand_id: 22 },
        { name: "Fossil Q Explorist", brand_id: 22 },
        { name: "Fossil Q Venture", brand_id: 22 },

        // Casio
        { name: "Casio G-Shock GA-2100", brand_id: 23 },
        { name: "Casio G-Shock DW5600", brand_id: 23 },
        { name: "Casio Pro Trek Smart", brand_id: 23 },
        { name: "Casio Baby-G", brand_id: 23 },
        { name: "Casio A168WA", brand_id: 23 },
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
