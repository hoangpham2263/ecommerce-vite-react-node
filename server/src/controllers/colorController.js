import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Color.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "desc","updatedAt","createdAt"],
        order: [["name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, color: rows, }
    } else {
      data = await db.Color.findAll({ attributes: ["id", "name", "desc","updatedAt","createdAt"], order: [["name", "ASC"]] })
    }
    return res.status(200).json({ message: "get color success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name, desc } = req.body.data;
    if (!name || !desc) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Color.create({ name: name, desc: desc });
    return res.status(200).json({ message: "a color is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let color = await db.Color.findOne({ where: { id: data?.id, }, });
    if (color) {
      await color.update({ name: data.name, desc: data.desc });
      return res.status(200).json({ message: "update color success", code: 0 });
    } else {
      return res.status(200).json({ message: "color not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let color = await db.Color.findOne({ where: { id: id, }, });
    if (color) {
      await color.destroy();
      return res.status(200).json({ message: "delete color success", code: 0 });
    } else {
      return res.status(200).json({ message: "color not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
