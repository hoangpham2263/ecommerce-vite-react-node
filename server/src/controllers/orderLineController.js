import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order_Line.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name","updatedAt","createdAt"],
        order: [["name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, orderLine: rows, }
    } else {
      data = await db.Order_Line.findAll({ attributes: ["id", "name","updatedAt","createdAt"], order: [["name", "ASC"]] })
    }
    return res.status(200).json({ message: "get order line success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name} = req.body.data;
    if (!name ) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Order_Line.create({ name: name});
    return res.status(200).json({ message: "a order line is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let orderLine = await db.Order_Line.findOne({ where: { id: data?.id, }, });
    if (orderLine) {
      await orderLine.update({ name: data.name, desc: data.desc });
      return res.status(200).json({ message: "update order line success", code: 0 });
    } else {
      return res.status(200).json({ message: "order line not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let orderLine = await db.Order_Line.findOne({ where: { id: id, }, });
    if (orderLine) {
      await orderLine.destroy();
      return res.status(200).json({ message: "delete order line success", code: 0 });
    } else {
      return res.status(200).json({ message: "order line not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
