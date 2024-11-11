import slugify from "slugify";
import db from "../models/index";
import { UploadCloudList } from "../utility/UploadCloudList";
const { Op } = require('sequelize');

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
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
        order: [["title", "ASC"]],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
          { model: db.Brand, attributes: ["id", "name"] },
          { model: db.Version, attributes: ["id", "name"] },
        ],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, product: rows, }
    } else {
      data = await db.Product.findAll({
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
        order: [["title", "ASC"]],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
          { model: db.Brand, attributes: ["id", "name"] },
          { model: db.Version, attributes: ["id", "name"] },
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
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
        include: [
          { model: db.Capacity, attributes: ["id", "name"] },
          { model: db.Color, attributes: ["id", "name", 'color_code'] },
          { model: db.Ram, attributes: ["id", "name"] },
          { model: db.Category, attributes: ["id", "name"] },
          { model: db.Brand, attributes: ["id", "name"] },
          { model: db.Version, attributes: ["id", "name"] },
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

const readFuncByIds = async (req, res) => {
  try {
    let { ids } = req.query;
    ids = typeof (ids) === 'string' ? JSON.parse(ids) : ids
    const data = await db.Product.findAll({
      where: { id: { [Op.in]: ids } },
      attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
      order: [["id", "ASC"]],
      include: [
        { model: db.Capacity, attributes: ["id", "name"] },
        { model: db.Color, attributes: ["id", "name", 'color_code'] },
        { model: db.Ram, attributes: ["id", "name"] },
        { model: db.Category, attributes: ["id", "name"] },
        { model: db.Brand, attributes: ["id", "name"] },
        { model: db.Version, attributes: ["id", "name"] },
      ],
    })
    return res.status(200).json({ message: "get product success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createProductTitle = async (brand_id, version_id, ram_id, capacity_id, color_id) => {
  const [brand, version, ram, capacity, color] = await Promise.all([
    db.Brand.findOne({ where: { id: brand_id } }),
    db.Version.findOne({ where: { id: version_id } }),
    db.Ram.findOne({ where: { id: ram_id } }),
    db.Capacity.findOne({ where: { id: capacity_id } }),
    db.Color.findOne({ where: { id: color_id } })
  ]);
  const title = `${brand?.dataValues?.name} ${version?.dataValues?.name} ${ram?.dataValues?.name} ${capacity?.dataValues?.name} ${color?.dataValues?.name}`;
  return title
};

const createProductSlug = async (brand_id, version_id, category_id, ram_id, capacity_id, color_id) => {
  const [brand, version, category, ram, capacity, color] = await Promise.all([
    db.Brand.findOne({ where: { id: brand_id } }),
    db.Version.findOne({ where: { id: version_id } }),
    db.Category.findOne({ where: { id: category_id } }),
    db.Ram.findOne({ where: { id: ram_id } }),
    db.Capacity.findOne({ where: { id: capacity_id } }),
    db.Color.findOne({ where: { id: color_id } })
  ]);
  const combinedString = `${brand?.dataValues?.name}-${version?.dataValues?.name}-${category?.dataValues?.name}-${ram?.dataValues?.name}-${capacity?.dataValues?.name}-${color?.dataValues?.name}`;
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
  const { capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, brand_id, version_id, is_active, images } = req.body.data;

  if (!capacity_id || !ram_id || !color_id || !stock || !discount || !price || !category_id || !brand_id || !version_id) {
    return res.status(400).json({ message: "missing required parameters", code: 1 });
  }

  const t = await db.sequelize.transaction();
  try {
    const title = await createProductTitle(brand_id, version_id, ram_id, capacity_id, color_id);
    const slug = await createProductSlug(brand_id, version_id, category_id, ram_id, capacity_id, color_id);

    const productData = { title, ram_id, capacity_id, color_id, stock, discount, price, desc, category_id, brand_id, version_id, is_active: is_active ?? true, slug };

    const data = await db.Product.create(productData, { transaction: t });

    await handleCreateImageByProduct(images, data.id);

    await t.commit();

    return res.status(200).json({ message: "A product is created successfully with images", code: 0, data });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message || "error from server", code: -1 });
  }
};

const updateFuncStatus = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(400).json({ message: "Missing required parameters", code: 1 });
    }

    const product = await db.Product.findOne({
      where: { id: data.id },
      attributes: ["id", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"],
    });

    if (!product) {
      return res.status(404).json({ message: "Product does not exist", code: 1 });
    }

    const isActive = data.is_active !== undefined ? data.is_active : product.is_active;

    await product.update({
      is_active: isActive,
    });

    return res.status(200).json({ message: "Product status updated successfully", code: 0 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: -1 });
  }
};

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(400).json({ message: "Missing required parameters", code: 1 });
    }

    const product = await db.Product.findOne({ where: { id: data.id }, attributes: ["id", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "is_active", "slug", "category_id", "brand_id", "version_id", "updatedAt", "createdAt"] });

    if (!product) { return res.status(404).json({ message: "Product does not exist", code: 1 }) }

    // Fetch related data
    const [query_brand, query_version, query_category, query_ram, query_capacity, query_color] = await Promise.all([
      db.Brand.findOne({ where: { id: data.brand_id } }),
      db.Version.findOne({ where: { id: data.version_id } }),
      db.Category.findOne({ where: { id: data.category_id } }),
      db.Ram.findOne({ where: { id: data.ram_id } }),
      db.Capacity.findOne({ where: { id: data.capacity_id } }),
      db.Color.findOne({ where: { id: data.color_id } }),
    ]);

    // Create slug based on the latest data
    const combinedString = `${query_brand?.name}-${query_version?.name}-${query_category?.name}-${query_ram?.name}-${query_capacity?.name}-${query_color?.name}`;
    const slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });

    // Create title
    const title = `${query_brand?.name} ${query_version?.name} ${query_ram?.name} ${query_capacity?.name} ${query_color?.name}`;
    const { capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, brand_id, version_id, is_active, images } = data;

    // Handle images update
    if (Array.isArray(images)) {
      const currentImages = await db.Image.findAll({ where: { product_id: data.id } });
      const currentImageUrls = currentImages.map(image => image.url);
      const newImageUrls = images.map(image => image.url);
      const isImageChanged = JSON.stringify(currentImageUrls) !== JSON.stringify(newImageUrls);

      if (isImageChanged) {
        await db.Image.destroy({ where: { product_id: data.id } });
        await handleCreateImageByProduct(images, data.id);
      }
    }

    // Update product details
    await product.update({
      title,
      capacity_id,
      ram_id,
      color_id,
      stock,
      discount,
      price,
      desc,
      category_id,
      brand_id,
      version_id,
      slug,
      is_active: is_active ?? product.is_active,
    });

    return res.status(200).json({ message: "Product updated successfully", code: 0 });

  } catch (error) {
    console.log(error)
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

module.exports = { readFunc, readFuncWithSlug, createFunc, updateFunc, deleteFunc, updateFuncStatus, readFuncByIds };
