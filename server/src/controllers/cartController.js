import db from "../models/index";
const { Op, where } = require('sequelize');

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Cart.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "UserId", "ProductId", "quantity", "total", "updatedAt", "createdAt"],
        order: [["UserId", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, cart: rows, }
    } else {
      data = await db.Cart.findAll({ attributes: ["id", "UserId", "ProductId", "quantity", "total", "updatedAt", "createdAt"], order: [["UserId", "ASC"]] })
    }
    return res.status(200).json({ message: "get cart success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const readFuncAmount = async (req, res) => {
  try {
    if (req.query.userId) {
      const { count, rows } = await db.Cart.findAndCountAll({ where: { UserId: req.query.userId }, attributes: ["id", "UserId", "ProductId", "quantity", "total", "updatedAt", "createdAt"], order: [["UserId", "ASC"]] })
      return res.status(200).json({ message: "get cart success", code: 0, data: count, });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { UserId, ProductId, quantity, total } = req.body.data;
    if (!UserId || !ProductId || !quantity || !total) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let cart = await db.Cart.findOne({ where: { [Op.and]: [{ UserId: UserId }, { ProductId: ProductId }] } });
    if (!cart) {
      let data = await db.Cart.create({ UserId: UserId, ProductId: ProductId, quantity: quantity, total: total });
      return res.status(200).json({ message: "a cart is created successfully", code: 0, data: data });
    } else {
      const a = await cart.update({ quantity: quantity, total: total });
      return res.status(200).json({ message: "update cart success", code: 0, data: a });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let cart = await db.Cart.findOne({ where: { id: id, }, });
    if (cart) {
      await cart.destroy();
      return res.status(200).json({ message: "delete cart success", code: 0 });
    } else {
      return res.status(200).json({ message: "cart not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, deleteFunc, readFuncAmount };
