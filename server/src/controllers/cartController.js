import db from "../models/index";
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");

const prod_attributes = ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"]
const prod_includes = [
  { model: db.Capacity, attributes: ["id", "name"] },
  { model: db.Ram, attributes: ["id", "name"] },
  { model: db.Category, attributes: ["id", "name"] },
  { model: db.Brand, attributes: ["id", "name"] },
  { model: db.Version, attributes: ["id", "name"] },
]
const conf_attributes = ["id", "price", "stock", "discount", "color_id", "product_id", "is_active", "updatedAt", "createdAt"]
const conf_includes = [
  { model: db.Color, attributes: ["id", "name", 'color_code'] },
  { model: db.Product, attributes: ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"] },
]

const cart_attributes = ["id", "UserId", "ProductId", "quantity", "config_id", "updatedAt", "createdAt"]
const cart_includes = [
  { model: db.Product, attributes: prod_attributes, include: prod_includes },
  { model: db.Config, attributes: conf_attributes, include: conf_includes }
]



const readFunc = async (req, res) => {
  try {
    let data;
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Cart.findAndCountAll({
        offset: offset,
        limit: limit,
        where: { UserId: req.query.user_id, is_purchased: false },
        attributes: cart_attributes,
        order: [["UserId", "ASC"]],
        include: cart_includes,
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, cart: rows, }
    } else {
      data = await db.Cart.findAll({
        where: { UserId: req.query.user_id, is_purchased: false },
        attributes: cart_attributes,
        order: [["UserId", "ASC"]],
        include: cart_includes,
      })
    }

    const cartWithImages = await Promise.all(data.map(async (cart) => {
      const cartData = cart.dataValues;

      const images = await db.Image.findAll({
        where: { config_id: cartData.config_id },
        attributes: ["id", "url", "file_name"],
      });

      return {
        ...cartData,
        images: images.map(image => ({
          id: image.id,
          url: image.url,
          file_name: image.file_name,
        }))
      };
    }));

    return res.status(200).json({ message: "get cart success", code: 0, data: cartWithImages, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const readFuncAmount = async (req, res) => {
  try {
    const token = req?.cookies?.jwt;
    if (!token) return res.status(401).json({ message: "No token provided", code: -1 });
    const decoded = jwt.decode(token);

    const { count, rows } = await db.Cart.findAndCountAll({
      where: { UserId: decoded?.userPresent?.user?.id, is_purchased: false },
      attributes: cart_attributes,
      order: [["UserId", "ASC"]]
    });
    return res.status(200).json({ message: "get cart success", code: 0, data: count, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const readFuncByIds = async (req, res) => {
  try {
    let { ids } = req.query;
    ids = typeof (ids) === 'string' ? JSON.parse(ids) : ids;

    const data = await db.Cart.findAll({
      where: { id: { [Op.in]: ids }, is_purchased: false },
      attributes: cart_attributes,
      order: [["UserId", "ASC"]],
      include: cart_includes,
    });

    const cartWithImages = await Promise.all(data.map(async (cart) => {
      const cartData = cart.dataValues;

      const images = await db.Image.findAll({
        where: { config_id: cartData.config_id },
        attributes: ["id", "url", "file_name"],
      });
      return {
        ...cartData,
        images: images.map(image => ({
          id: image.id,
          url: image.url,
          file_name: image.file_name,
        }))
      };
    }));
    return res.status(200).json({ message: "get cart success", code: 0, data: cartWithImages });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}


const createFunc = async (req, res) => {
  try {
    const { ProductId, quantity, config_id } = req.body.data;
    if (!ProductId || !quantity) return res.status(400).json({ message: "missing required parameters" });
    let cart = await db.Cart.findOne({ where: { [Op.and]: [{ UserId: req?.account?.user?.id }, { ProductId: ProductId }, { config_id: config_id }, { is_purchased: false }] } });
    if (!cart) {
      let data = await db.Cart.create({ UserId: req?.account?.user?.id, ProductId: ProductId, quantity: quantity, config_id: config_id });
      return res.status(201).json({ message: "a cart is created successfully", data: data });
    } else {
      const a = await cart.update({ quantity: quantity, config_id: config_id });
      return res.status(200).json({ message: "update cart success", data: a });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server" });
  }
}

const updateFunc = async (req, res) => {
  try {
    let { ids } = req.body.data;

    const updateCount = await db.Cart.update(
      { is_purchased: true },
      { where: { id: { [Op.in]: ids } } }
    );

    if (updateCount[0] > 0) {
      return res.status(200).json({ message: "update cart success" });
    } else {
      return res.status(404).json({ message: "cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server" });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let { ids } = req.body;
    const deleteCount = await db.Cart.destroy({
      where: { id: { [Op.in]: ids } }
    })
    if (deleteCount > 0) {
      return res.status(200).json({ message: "delete cart success" });
    } else {
      return res.status(404).json({ message: "cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server" });
  }
}

module.exports = { readFunc, createFunc, deleteFunc, readFuncAmount, readFuncByIds, updateFunc };
