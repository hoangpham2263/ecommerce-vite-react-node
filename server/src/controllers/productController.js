import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "title", "desc","updatedAt","createdAt"],
        order: [["title", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, products: rows, }
    } else {
      data = await db.Product.findAll({ attributes: ["id", "title", "desc","updatedAt","createdAt"], order: [["title", "ASC"]] })
    }
    return res.status(200).json({ message: "get products success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { title, desc } = req.body.data;
    if (!title || !desc) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Product.create({ title: title, desc: desc });
    return res.status(200).json({ message: "a product is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let product = await db.Product.findOne({ where: { id: data?.id, }, });
    if (product) {
      await product.update({ title: data.title, desc: data.desc });
      return res.status(200).json({ message: "update product success", code: 0 });
    } else {
      return res.status(200).json({ message: "product not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let product = await db.Product.findOne({ where: { id: id, }, });
    if (product) {
      await product.destroy();
      return res.status(200).json({ message: "delete product success", code: 0 });
    } else {
      return res.status(200).json({ message: "product not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
