import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Role.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "key_role", "name","updatedAt","createdAt"],
        order: [["key_role", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, role: rows, }
    } else {
      data = await db.Role.findAll({ attributes: ["id", "key_role", "name","updatedAt","createdAt"], order: [["key_role", "ASC"]] })
    }
    return res.status(200).json({ message: "get roles success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { key_role, name } = req.body.data;
    if (!key_role || !name) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Role.create({ key_role: key_role, name: name });
    return res.status(200).json({ message: "a role is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let role = await db.Role.findOne({ where: { id: data?.id, }, });
    if (role) {
      await role.update({ key_role: data.key_role, name: data.name });
      return res.status(200).json({ message: "update role success", code: 0 });
    } else {
      return res.status(200).json({ message: "role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let role = await db.Role.findOne({ where: { id: id, }, });
    if (role) {
      await role.destroy();
      return res.status(200).json({ message: "delete role success", code: 0 });
    } else {
      return res.status(200).json({ message: "role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
