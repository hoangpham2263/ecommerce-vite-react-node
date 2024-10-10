import slugify from "slugify";
import db from "../models/index";
import { where } from "sequelize";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"],
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
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"],
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
    console.log(error)
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
        attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"],
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

const createFunc = async (req, res) => {
  try {
    const { title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id } = req.body.data;

    const query_category = await db.Category.findOne({ where: { id: category_id } })
    const query_ram = await db.Ram.findOne({ where: { id: ram_id } })
    const query_capacity = await db.Capacity.findOne({ where: { id: capacity_id } })
    const query_color = await db.Color.findOne({ where: { id: color_id } })

    let combinedString = `${query_category?.dataValues?.name}-${query_ram?.dataValues?.name}-${query_capacity?.dataValues?.name}-${query_color?.dataValues?.name}`;
    let slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });
    if (!title || !capacity_id || !ram_id || !color_id || !stock || !discount || !price || !category_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Product.create({ title: title, ram_id: ram_id, capacity_id: capacity_id, color_id: color_id, stock: stock, discount: discount, price: price, desc: desc, category_id: category_id, slug: slug });
    return res.status(200).json({ message: "a product is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    if (!data || !data.id) { return res.status(200).json({ message: "Missing required parameters", code: 1 }) }

    const product = await db.Product.findOne({ where: { id: data.id }, attributes: ["id", "title", "capacity_id", "ram_id", "color_id", "stock", "discount", "price", "desc", "slug", "category_id", "updatedAt", "createdAt"], });

    const query_category = await db.Category.findOne({ where: { id: product?.dataValues?.category_id } })
    const query_ram = await db.Ram.findOne({ where: { id: product?.dataValues?.ram_id } })
    const query_capacity = await db.Capacity.findOne({ where: { id: product?.dataValues?.capacity_id } })
    const query_color = await db.Color.findOne({ where: { id: product?.dataValues?.color_id } })

    if (!product) { return res.status(200).json({ message: "Sub product not exist", code: 1 }); }
    let combinedString = `${query_category?.dataValues?.name}-${query_ram?.dataValues?.name}-${query_capacity?.dataValues?.name}-${query_color?.dataValues?.name}`;
    const slug = slugify(combinedString, { lower: true, strict: true, replacement: '-' });

    const { title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id } = data;
    await product.update({ title, capacity_id, ram_id, color_id, stock, discount, price, desc, category_id, slug });

    return res.status(200).json({ message: "Update product success", code: 0 });

  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
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
