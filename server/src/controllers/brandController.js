import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Brand.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "updatedAt", "createdAt"],
        order: [["name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, brand: rows, }
    } else {
      data = await db.Brand.findAll({ attributes: ["id", "name", "updatedAt", "createdAt"], order: [["name", "ASC"]] })
    }
    return res.status(200).json({ message: "get brand success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name, category_id } = req.body.data;
    if (!name || !category_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Brand.create({ name: name, category_id: category_id });
    return res.status(200).json({ message: "a brand is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let brand = await db.Brand.findOne({ where: { id: data?.id, }, });
    if (brand) {
      await brand.update({ name: data.name, desc: data.desc });
      return res.status(200).json({ message: "update brand success", code: 0 });
    } else {
      return res.status(200).json({ message: "brand not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let brand = await db.Brand.findOne({ where: { id: id, }, });
    if (brand) {
      await brand.destroy();
      return res.status(200).json({ message: "delete brand success", code: 0 });
    } else {
      return res.status(200).json({ message: "brand not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
