import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Version.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "updatedAt", "createdAt"],
        order: [["name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, version: rows, }
    } else {
      data = await db.Version.findAll({ attributes: ["id", "name", "updatedAt", "createdAt"], order: [["name", "ASC"]] })
    }
    return res.status(200).json({ message: "get version success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name, brand_id } = req.body.data;
    if (!name || !brand_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Version.create({ name: name, brand_id: brand_id });
    return res.status(200).json({ message: "a version is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let version = await db.Version.findOne({ where: { id: data?.id, }, });
    if (version) {
      await version.update({ name: data.name, desc: data.desc });
      return res.status(200).json({ message: "update version success", code: 0 });
    } else {
      return res.status(200).json({ message: "version not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let version = await db.Version.findOne({ where: { id: id, }, });
    if (version) {
      await version.destroy();
      return res.status(200).json({ message: "delete version success", code: 0 });
    } else {
      return res.status(200).json({ message: "version not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
