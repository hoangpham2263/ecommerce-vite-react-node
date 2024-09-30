import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Category.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name","updatedAt","createdAt"],
        order: [["name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, category: rows, }
    } else {
      data = await db.Category.findAll({ attributes: ["id", "name","updatedAt","createdAt"], order: [["name", "ASC"]] })
    }
    return res.status(200).json({ message: "get category success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { name} = req.body.data;
    if (!name ) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Category.create({ name: name});
    return res.status(200).json({ message: "a category is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let category = await db.Category.findOne({ where: { id: data?.id, }, });
    if (category) {
      await category.update({ name: data.name, desc: data.desc });
      return res.status(200).json({ message: "update category success", code: 0 });
    } else {
      return res.status(200).json({ message: "category not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let category = await db.Category.findOne({ where: { id: id, }, });
    if (category) {
      await category.destroy();
      return res.status(200).json({ message: "delete category success", code: 0 });
    } else {
      return res.status(200).json({ message: "category not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
