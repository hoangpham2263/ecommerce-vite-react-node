import slugify from "slugify";
import db from "../models/index";
const { Op } = require('sequelize');

const prod_attributes = ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"]
const prod_includes = [
  { model: db.Capacity, attributes: ["id", "name"] },
  { model: db.Ram, attributes: ["id", "name"] },
  { model: db.Category, attributes: ["id", "name"] },
  { model: db.Brand, attributes: ["id", "name"] },
  { model: db.Version, attributes: ["id", "name"] },
]

// ---------- group images by config_id ----------
const groupImagesByConfigId = (images) => {
  return images.reduce((acc, image) => {
    if (!acc[image.config_id]) {
      acc[image.config_id] = [];
    }
    acc[image.config_id].push(image);
    return acc;
  }, {});
};

// ---------- group configs by product_id ----------
const groupConfigsByProductId = (configs) => {
  return configs.reduce((acc, config) => {
    if (!acc[config.product_id]) {
      acc[config.product_id] = [];
    }
    acc[config.product_id].push(config);
    return acc;
  }, {});
};

const readFunc = async (req, res) => {
  try {
    let data;
    const queryImage = await db.Image.findAll({ attributes: ["id", "url", "file_name", "config_id", "updatedAt", "createdAt"], order: [["id", "ASC"]] });
    const queryConfig = await db.Config.findAll({ attributes: ["id", "price", "stock", "discount", "color_id", "product_id", "is_active", "updatedAt", "createdAt"], order: [["id", "ASC"]], include: [{ model: db.Color, attributes: ["id", "name", "color_code", "updatedAt", "createdAt"] }] });

    const imagesByConfigId = groupImagesByConfigId(queryImage);
    const groupedConfigs = queryConfig.map((config) => {
      const configData = config.toJSON();
      return { ...configData, images: imagesByConfigId[configData.id] || [] }
    });
    const configByProductId = groupConfigsByProductId(groupedConfigs);

    // ---------- pagination ----------
    if (req.query.category_id && req.query.brand_id && req.query.version_id && req.query.page && req.query.limit) {
      // Truy vấn với category_id, brand_id, version_id, page, và limit
      let { category_id, brand_id, version_id, page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;

      let whereCondition = {
        [Op.and]: [
          { category_id: category_id },
          { brand_id: brand_id },
          { version_id: version_id }
        ]
      };

      let { count, rows } = await db.Product.findAndCountAll({
        where: whereCondition,
        offset: offset,
        limit: limit,
        attributes: prod_attributes,
        order: [["id", "DESC"]],
        include: prod_includes,
      });

      let totalPages = Math.ceil(count / limit);
      const groupedProducts = rows.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });

      data = { totalRows: count, totalPages: totalPages, product: groupedProducts };

    } else if (req.query.page && req.query.limit) {
      // Phân trang mặc định không có category_id, brand_id, version_id
      let { page, limit, search } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;

      let whereCondition = {};
      if (search) {
        whereCondition = {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { desc: { [Op.like]: `%${search}%` } }
          ]
        };
      }

      let { count, rows } = await db.Product.findAndCountAll({
        where: whereCondition,
        offset: offset,
        limit: limit,
        attributes: prod_attributes,
        order: [["id", "DESC"]],
        include: prod_includes,
      });

      let totalPages = Math.ceil(count / limit);
      const groupedProducts = rows.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });

      data = { totalRows: count, totalPages: totalPages, product: groupedProducts };

    } else if (req.query.category_id && req.query.brand_id && req.query.version_id) {
      let { category_id, brand_id, version_id } = req.query;
      data = await db.Product.findAll({
        where: {
          [Op.and]: [
            { category_id: category_id },
            { brand_id: brand_id },
            { version_id: version_id }
          ]
        },
        attributes: prod_attributes,
        order: [["capacity_id", "ASC"]],
        include: prod_includes,
      });
      data = data.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });

    } else if (req.query.ids) {
      let { ids } = req.query;
      ids = typeof (ids) === 'string' ? JSON.parse(ids) : ids;
      data = await db.Product.findAll({
        where: { id: { [Op.in]: ids } },
        attributes: prod_attributes,
        order: [["id", "DESC"]],
        include: prod_includes,
      });
      data = data.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });

    } else if (req.query.search) {
      const { search } = req.query;
      data = await db.Product.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { desc: { [Op.like]: `%${search}%` } }
          ]
        },
        attributes: prod_attributes,
        order: [["id", "DESC"]],
        include: prod_includes,
      });
      data = data.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });

    } else {
      data = await db.Product.findAll({
        attributes: prod_attributes,
        order: [["id", "DESC"]],
        include: prod_includes,
      });
      data = data.map((product) => {
        const productData = product.toJSON();
        return {
          ...productData,
          configs: configByProductId[productData.id] || [],
        };
      });
    }

    return res.status(200).json({ message: "get product success", code: 0, data: data });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};


// ---------- Read Product Detail ----------
const readFuncWithSlug = async (req, res) => {
  try {
    if (req.params.slug) {
      const { slug } = req.params;

      // Fetch the product by slug
      const product = await db.Product.findOne({
        where: { slug: slug },
        attributes: prod_attributes,
        include: prod_includes,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found", code: -1 });
      }

      // Query configurations and images for the product
      const queryConfig = await db.Config.findAll({
        where: { product_id: product.id },
        attributes: ["id", "price", "stock", "discount", "color_id", "product_id", "is_active", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
        include: [{ model: db.Color, attributes: ["id", "name", "color_code", "updatedAt", "createdAt"] }]
      });
      const queryImage = await db.Image.findAll({
        attributes: ["id", "url", "file_name", "config_id", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
      });

      // Group images by config_id and configs by product_id
      const imagesByConfigId = groupImagesByConfigId(queryImage);
      const groupedConfigs = queryConfig.map((config) => {
        const configData = config.toJSON();
        return { ...configData, images: imagesByConfigId[configData.id] || [] };
      });

      // Attach configs to the product
      const productData = product.toJSON();
      productData.configs = groupedConfigs;

      return res.status(200).json({ message: "get product success", code: 0, data: productData });

    } else {
      return res.status(400).json({ message: "slug not provided", code: -1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};


// ---------- crate product ----------
const createProductTitle = async (category_id, brand_id, version_id, ram_id, capacity_id) => {
  const [category, brand, version, ram, capacity] = await Promise.all([
    db.Category.findOne({ where: { id: category_id } }),
    db.Brand.findOne({ where: { id: brand_id } }),
    db.Version.findOne({ where: { id: version_id } }),
    db.Ram.findOne({ where: { id: ram_id } }),
    db.Capacity.findOne({ where: { id: capacity_id } }),
  ]);
  const title = `${category?.dataValues?.name} ${brand?.dataValues?.name} ${version?.dataValues?.name} - RAM ${ram?.dataValues?.name}, Dung lượng bộ nhớ ${capacity?.dataValues?.name}`;
  return title
};

const createProductSlug = async (category_id, brand_id, version_id, ram_id, capacity_id) => {
  const [category, brand, version, ram, capacity] = await Promise.all([
    db.Category.findOne({ where: { id: category_id } }),
    db.Brand.findOne({ where: { id: brand_id } }),
    db.Version.findOne({ where: { id: version_id } }),
    db.Ram.findOne({ where: { id: ram_id } }),
    db.Capacity.findOne({ where: { id: capacity_id } }),
  ]);
  const combinedString = `${category?.dataValues?.name}-${brand?.dataValues?.name}-${version?.dataValues?.name}-${ram?.dataValues?.name}-${capacity?.dataValues?.name}`;
  return slugify(combinedString, { lower: true, strict: true, replacement: '-', locale: 'vi' });
};

const createFunc = async (req, res) => {
  const { desc, ram_id, capacity_id, category_id, brand_id, version_id, is_active } = req.body.data;

  if (!ram_id || !capacity_id || !category_id || !brand_id || !version_id) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 });
  }

  const t = await db.sequelize.transaction();
  try {
    const title = await createProductTitle(category_id, brand_id, version_id, ram_id, capacity_id);
    const slug = await createProductSlug(category_id, brand_id, version_id, ram_id, capacity_id);

    const productData = { title, desc, ram_id, capacity_id, category_id, brand_id, version_id, is_active: is_active ?? true, slug };

    const data = await db.Product.create(productData, { transaction: t });

    await t.commit();

    return res.status(200).json({ message: "tạo sản phẩm thành công", code: 0, data });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message || "error from server", code: -1 });
  }
};

// ---------- update product ----------
const updateFuncStatus = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) { return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 }) }

    const product = await db.Product.findOne({ where: { id: data.id }, attributes: prod_attributes });

    if (!product) { return res.status(404).json({ message: "Product does not exist", code: 1 }) }

    const isActive = data.is_active !== undefined ? data.is_active : product.is_active;

    await product.update({ is_active: isActive });

    return res.status(200).json({ message: "Product status updated successfully", code: 0 });

  } catch (error) {
    return res.status(500).json({ message: "Server error", code: -1 });
  }
};

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 });
    }

    const product = await db.Product.findOne({ where: { id: data.id }, attributes: prod_attributes });

    if (!product) { return res.status(404).json({ message: "Product does not exist", code: 1 }) }

    const [query_category, query_brand, query_version, query_ram, query_capacity] = await Promise.all([
      db.Category.findOne({ where: { id: data.category_id } }),
      db.Brand.findOne({ where: { id: data.brand_id } }),
      db.Version.findOne({ where: { id: data.version_id } }),
      db.Ram.findOne({ where: { id: data.ram_id } }),
      db.Capacity.findOne({ where: { id: data.capacity_id } }),
    ]);

    const combinedString = `${query_category?.name}-${query_brand?.name}-${query_version?.name}-${query_ram?.name}-${query_capacity?.name}`;
    const slug = slugify(combinedString, { lower: true, strict: true, replacement: '-', locale: 'vi' });
    const title = `${query_category?.name} ${query_brand?.name} ${query_version?.name} - RAM ${query_ram?.name}, Dung lượng bộ nhớ ${query_capacity?.name}`

    const { desc, ram_id, capacity_id, category_id, brand_id, version_id, is_active } = data;

    await product.update({ title, desc, slug, ram_id, capacity_id, category_id, brand_id, version_id, is_active: is_active ?? product.is_active });

    return res.status(200).json({ message: "Product updated successfully", code: 0 });

  } catch (error) {
    return res.status(500).json({ message: "Server error", code: -1 });
  }
};

// ---------- delete product ----------
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

module.exports = { readFunc, readFuncWithSlug, createFunc, updateFunc, deleteFunc, updateFuncStatus };
