import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Position.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "key_position", "name", "desc", "is_active", "is_master","updatedAt","createdAt"],
        order: [["key_position", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, position: rows, }
    } else {
      data = await db.Position.findAll({ attributes: ["id", "key_position", "name", "desc", "is_active", "is_master","updatedAt","createdAt"], order: [["key_position", "ASC"]] })
    }
    return res.status(200).json({ message: "get positions success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { key_position, name, desc } = req.body.data;
    if (!key_position || !name) return res.status(200).json({ message: "missing required parameters", code: 1});
    let data = await db.Position.create({ key_position: key_position, name: name, desc: desc, is_active: true, is_master: false });
    return res.status(200).json({ message: "a position is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let position = await db.Position.findOne({ where: { id: data?.id, }, });
    if (position) {
      await position.update({ key_position: data.key_position, name: data.name, desc: data.desc, is_active: data.is_active, is_master: data.is_master });
      return res.status(200).json({ message: "update position success", code: 0 });
    } else {
      return res.status(200).json({ message: "position not exist", code: 1 });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let position = await db.Position.findOne({ where: { id: id, }, });
    if (position) {
      await position.destroy();
      return res.status(200).json({ message: "delete position success", code: 0 });
    } else {
      return res.status(200).json({ message: "position not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
