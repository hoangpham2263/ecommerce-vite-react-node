import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Image.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "url", "file_name", "product_id", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, image: rows, }
    } else {
      data = await db.Image.findAll({ attributes: ["id", "url", "file_name", "product_id", "updatedAt", "createdAt"], order: [["id", "ASC"]] })
    }
    return res.status(200).json({ message: "get image success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { url,file_name, product_id } = req.body.data;
    if (!url || !file_name|| !product_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Image.create({ url: url, file_name: file_name, product_id: product_id });
    return res.status(200).json({ message: "a image is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let image = await db.Image.findOne({ where: { id: data?.id, }, });
    if (image) {
      await image.update({  url:data.url, file_name: data.file_name, product_id: data.product_id });
      return res.status(200).json({ message: "update image success", code: 0 });
    } else {
      return res.status(200).json({ message: "image not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let image = await db.Image.findOne({ where: { id: id, }, });
    if (image) {
      await image.destroy();
      return res.status(200).json({ message: "delete image success", code: 0 });
    } else {
      return res.status(200).json({ message: "image not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
