import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "user_id", "order_line_id", "total", "aa","note", "updatedAt", "createdAt"],
        order: [["user_id", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, order: rows, }
    } else {
      data = await db.Order.findAll({ attributes: ["id", "user_id", "order_line_id", "total", "note", "updatedAt", "createdAt"], order: [["user_id", "ASC"]] })
    }
    return res.status(200).json({ message: "get order success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { user_id, order_line_id, total, note } = req.body.data;
    if (!user_id || !order_line_id || !total || !note) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Order.create({ user_id: user_id, order_line_id: order_line_id, total: total, note: note });
    return res.status(200).json({ message: "a order is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let order = await db.Order.findOne({ where: { id: data?.id, }, });
    if (order) {
      await order.update({ user_id: data.user_id, order_line_id: data.order_line_id, total: data.total, note: data.note });
      return res.status(200).json({ message: "update order success", code: 0 });
    } else {
      return res.status(200).json({ message: "order not exist", code: 1 });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let order = await db.Order.findOne({ where: { id: id, }, });
    if (order) {
      await order.destroy();
      return res.status(200).json({ message: "delete order success", code: 0 });
    } else {
      return res.status(200).json({ message: "order not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
