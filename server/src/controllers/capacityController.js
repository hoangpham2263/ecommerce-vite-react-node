import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Capacity.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, capacity: rows, }
    } else {
      data = await db.Capacity.findAll({ attributes: ["id", "name", "updatedAt", "createdAt"], order: [["id", "ASC"]] })
    }
    return res.status(200).json({ message: "get capacity success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name } = req.body.data;
    if (!name) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Capacity.create({ name: name });
    return res.status(200).json({ message: "a capacity is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let capacity = await db.Capacity.findOne({ where: { id: data?.id, }, });
    if (capacity) {
      await capacity.update({ name: data.name });
      return res.status(200).json({ message: "update capacity success", code: 0 });
    } else {
      return res.status(200).json({ message: "capacity not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let capacity = await db.Capacity.findOne({ where: { id: id, }, });
    if (capacity) {
      await capacity.destroy();
      return res.status(200).json({ message: "delete capacity success", code: 0 });
    } else {
      return res.status(200).json({ message: "capacity not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
