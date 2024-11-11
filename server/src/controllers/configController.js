import slugify from "slugify";
import db from "../models/index";
import { UploadCloudList } from "../utility/UploadCloudList";
const { Op, where } = require('sequelize');


const conf_attributes = ["id", "price", "stock", "discount", "color_id", "product_id", "is_active", "updatedAt", "createdAt"]
const conf_includes = [
  { model: db.Color, attributes: ["id", "name", 'color_code'] },
  { model: db.Product, attributes: ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"] },
]

// ---------- read config ----------
const readFunc = async (req, res) => {
  try {
    let data = await db.Config.findAll({
      where: { product_id: req.query.productId },
      attributes: conf_attributes,
      order: [["id", "ASC"]],
      include: conf_includes,
    })
    return res.status(200).json({ message: "get config success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

// ---------- create config ----------
const handleCreateImageByConfig = async (images, config_id) => {
  if (!Array.isArray(images) || images.length === 0) throw new Error("missing required parameters");

  const imageUrls = images.map(({ url }) => url);
  const imageFileName = images.map(({ file_name }) => file_name);

  const uploadedImageUrls = await UploadCloudList(imageFileName, imageUrls, "imageWebListTmp");

  const imageData = images.map(({ file_name }, index) => {
    if (!file_name) throw new Error("missing required parameters");
    return {
      url: uploadedImageUrls[index] || null,
      file_name,
      config_id,
    };
  });

  return db.Image.bulkCreate(imageData);
};

const createFunc = async (req, res) => {
  const { price, stock, discount, color_id, images, is_active, product_id } = req.body.data;

  if (!price || !stock || !discount || !color_id || !images || !product_id) {
    return res.status(400).json({ message: "missing required parameters", code: 1 });
  }

  const t = await db.sequelize.transaction();
  try {
    const configData = { price, stock, discount, color_id, is_active: is_active ?? true, product_id };

    const data = await db.Config.create(configData, { transaction: t });

    await handleCreateImageByConfig(images, data.id);

    await t.commit();

    return res.status(200).json({ message: "A config is created successfully with images", code: 0, data });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message || "error from server", code: -1 });
  }
};

// // ---------- update product ----------
// const updateFuncStatus = async (req, res) => {
//   try {
//     const data = req?.body?.data;
//     if (!data || !data.id) {
//       return res.status(400).json({ message: "Missing required parameters", code: 1 });
//     }

//     const product = await db.Product.findOne({
//       where: { id: data.id },
//       attributes: ["id", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product does not exist", code: 1 });
//     }

//     const isActive = data.is_active !== undefined ? data.is_active : product.is_active;

//     await product.update({
//       is_active: isActive,
//     });

//     return res.status(200).json({ message: "Product status updated successfully", code: 0 });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", code: -1 });
//   }
// };

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(200).json({ message: "Missing required parameters", code: 1 });
    }

    const config = await db.Config.findOne({ where: { id: data.id }, attributes: conf_attributes });

    if (!config) { return res.status(200).json({ message: "Product does not exist", code: 1 }) }
    const { price, stock, discount, color_id, is_active, images, product_id } = data;
    if (Array.isArray(images)) {
      const currentImages = await db.Image.findAll({ where: { config_id: data.id } });
      const currentImageUrls = currentImages.map(image => image.url);
      const newImageUrls = images.map(image => image.url);
      const isImageChanged = JSON.stringify(currentImageUrls) !== JSON.stringify(newImageUrls);
      if (isImageChanged) {
        await db.Image.destroy({ where: { config_id: data.id } });
        await handleCreateImageByConfig(images, data.id);
      }
    }

    await config.update({
      price,
      stock,
      discount,
      color_id,
      product_id,
      is_active: is_active ?? config.is_active,
    });

    return res.status(200).json({ message: "Product updated successfully", code: 0 });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error", code: -1 });
  }
};

// // ---------- delete product ----------
// const deleteFunc = async (req, res) => {
//   try {
//     let { id } = req.body;
//     let product = await db.Product.findOne({ where: { id: id, }, });
//     if (product) {
//       await product.destroy();
//       return res.status(200).json({ message: "delete product success", code: 0 });
//     } else {
//       return res.status(200).json({ message: "product not exist", code: 1 });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "error from server", code: -1 });
//   }
// }

module.exports = { createFunc, readFunc, updateFunc };
