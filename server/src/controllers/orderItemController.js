import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order_Item.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "OrderId", "SubProductId", "quantity", "price", "updatedAt", "createdAt"],
        order: [["OrderId", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, orderItem: rows, }
    } else {
      data = await db.Order_Item.findAll({ attributes: ["id", "OrderId", "SubProductId", "quantity", "price", "updatedAt", "createdAt"], order: [["OrderId", "ASC"]] })
    }
    return res.status(200).json({ message: "get order item success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { OrderId, SubProductId, quantity, price } = req.body.data;
    if (!OrderId || !SubProductId || !quantity || !price) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Order_Item.create({ OrderId: OrderId, SubProductId: SubProductId, quantity: quantity, price: price });
    return res.status(200).json({ message: "a order item is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let orderItem = await db.Order_Item.findOne({ where: { id: data?.id, }, });
    if (orderItem) {
      const a = await orderItem.update({ OrderId: data.OrderId, SubProductId: data.SubProductId, quantity: data.quantity, price: data.price });
      return res.status(200).json({ message: "update order item success", code: 0, data: a });
    } else {
      return res.status(200).json({ message: "order item not exist", code: 1 });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let orderItem = await db.Order_Item.findOne({ where: { id: id, }, });
    if (orderItem) {
      await orderItem.destroy();
      return res.status(200).json({ message: "delete order item success", code: 0 });
    } else {
      return res.status(200).json({ message: "order item not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
