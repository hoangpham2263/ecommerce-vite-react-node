import slugify from "slugify";
import db from "../models/index";
import { UploadCloudList } from "../utility/UploadCloudList";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "updatedAt", "createdAt"],
        order: [["title", "ASC"]],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
        ],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, product: rows, }
    } else {
      data = await db.Product.findAll({
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "updatedAt", "createdAt"],
        order: [["title", "ASC"]],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
        ],
      })
    }
    return res.status(200).json({ message: "get product success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

// Read Product Detail
const readFuncWithSlug = async (req, res) => {
  try {
    if (req.params.slug) {
      const { slug } = req.params;
      const data = await db.Product.findOne({
        where: { slug: slug },
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "updatedAt", "createdAt"],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
        ],
      });
      return res.status(200).json({ message: "get product success", code: 0, data: data });
    } else {
      return res.status(400).json({ message: "slug not provided", code: -1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};
const createProductSlug = async (title, category_id, ram_id, capacity_id, color_id) => {
  const [category, ram, capacity, color] = await Promise.all([
    db.Category.findOne({ where: { id: category_id } }),
    db.Ram.findOne({ where: { id: ram_id } }),
    db.Capacity.findOne({ where: { id: capacity_id } }),
    db.Color.findOne({ where: { id: color_id } })
  ]);

  const combinedString = `${title}-${category?.dataValues?.name}-${ram?.dataValues?.name}-${capacity?.dataValues?.name}-${color?.dataValues?.name}`;
  return slugify(combinedString, { lower: true, strict: true, replacement: '-' });
};

// create product
const handleCreateImageByProduct = async (images, product_id) => {
  if (!Array.isArray(images) || images.length === 0) throw new Error("missing required parameters");

  const imageUrls = images.map(({ url }) => url);
  const imageFileName = images.map(({ file_name }) => file_name);

  const uploadedImageUrls = await UploadCloudList(imageFileName, imageUrls, "imageWebList");

  const imageData = images.map(({ file_name }, index) => {
    if (!file_name) throw new Error("missing required parameters");
    return {
      url: uploadedImageUrls[index] || null,
      file_name,
      product_id,
    };
  });

  return db.Image.bulkCreate(imageData);
};

const createFunc = async (req, res) => {
  console.log(req.body.data)
  const { title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, is_active, images } = req.body.data;

  if (!title || !capacity_id || !ram_id || !color_id || !stock || !discount || !price || !category_id) {
    return res.status(400).json({ message: "missing required parameters", code: 1 });
  }

  const t = await db.sequelize.transaction();

  try {
    const slug = await createProductSlug(title, category_id, ram_id, capacity_id, color_id);

    const productData = { title, ram_id, capacity_id, color_id, stock, discount, price, desc, category_id, is_active: is_active ?? true, slug };

    const data = await db.Product.create(productData, { transaction: t });

    await handleCreateImageByProduct(images, data.id);

    await t.commit();

    return res.status(200).json({ message: "A product is created successfully with images", code: 0, data });
  } catch (error) {
    await t.rollback();
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message || "error from server", code: -1 });
  }
};

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(200).json({ message: "Missing required parameters", code: 1 });
    }

    const product = await db.Product.findOne({
      where: { id: data.id },
      attributes: [
        "id", "title", "capacity_id", "ram_id", "color_id",
        "stock", "discount", "price", "desc", "is_active",
        "slug", "category_id", "updatedAt", "createdAt"
      ],
    });

    if (!product) {
      return res.status(200).json({ message: "Product does not exist", code: 1 });
    }

    const query_category = await db.Category.findOne({ where: { id: product?.dataValues?.category_id } });
    const query_ram = await db.Ram.findOne({ where: { id: product?.dataValues?.ram_id } });
    const query_capacity = await db.Capacity.findOne({ where: { id: product?.dataValues?.capacity_id } });
    const query_color = await db.Color.findOne({ where: { id: product?.dataValues?.color_id } });

    let combinedString = `${query_category?.dataValues?.name}-${query_ram?.dataValues?.name}-${query_capacity?.dataValues?.name}-${query_color?.dataValues?.name}`;
    const slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });

    const { title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, is_active, images } = data;

    if (Array.isArray(images)) {
      // Retrieve current images for the product
      const currentImages = await db.Image.findAll({ where: { product_id: data.id } });
      const currentImageUrls = currentImages.map(image => image.url);

      // Check if there is any change in the images
      const newImageUrls = images.map(image => image.url);
      const isImageChanged = JSON.stringify(currentImageUrls) !== JSON.stringify(newImageUrls);

      // If images have changed, delete old images and upload new ones
      if (isImageChanged) {
        // Delete old images if there are changes
        await db.Image.destroy({ where: { product_id: data.id } });
        // Create new images
        await handleCreateImageByProduct(images, data.id);
      }
    }

    // Update product details in the database
    await product.update({ title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, slug, is_active: is_active ?? product.is_active });

    return res.status(200).json({ message: "Product updated successfully", code: 0 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: -1 });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let product = await db.Product.findOne({ where: { id: id, }, });
    if (product) {
      await product.destroy();
      return res.status(200).json({ message: "delete product success", code: 0 });
    } else {
      return res.status(200).json({ message: "product not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, readFuncWithSlug, createFunc, updateFunc, deleteFunc };
