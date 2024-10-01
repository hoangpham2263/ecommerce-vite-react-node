import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Cart.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "UserId", "SubProductId", "quantity", "total", "updatedAt", "createdAt"],
        order: [["UserId", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, cart: rows, }
    } else {
      data = await db.Cart.findAll({ attributes: ["id", "UserId", "SubProductId", "quantity", "total", "updatedAt", "createdAt"], order: [["UserId", "ASC"]] })
    }
    return res.status(200).json({ message: "get cart success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { UserId, SubProductId, quantity, total } = req.body.data;
    if (!UserId || !SubProductId || !quantity || !total) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Cart.create({ UserId: UserId, SubProductId: SubProductId, quantity: quantity, total: total });
    return res.status(200).json({ message: "a cart is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let cart = await db.Cart.findOne({ where: { id: data?.id, }, });
    if (cart) {
      const a = await cart.update({ UserId: data.UserId, SubProductId: data.SubProductId, quantity: data.quantity, total: data.total });
      return res.status(200).json({ message: "update cart success", code: 0, data: a });
    } else {
      return res.status(200).json({ message: "cart not exist", code: 1 });
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

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
