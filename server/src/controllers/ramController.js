import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data;
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Ram.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
      });
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, ram: rows };
    } else {
      data = await db.Ram.findAll({
        attributes: ["id", "name", "updatedAt", "createdAt"],
        order: [["id", "ASC"]],
      });
    }
    return res.status(200).json({
      message: "get ram success",
      code: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};

const createFunc = async (req, res) => {
  try {
    const { name } = req.body.data;
    if (!name)
      return res
        .status(200)
        .json({ message: "missing required parameters", code: 1 });
    let data = await db.Ram.create({ name: name });
    return res.status(200).json({
      message: "a ram is created successfully",
      code: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data;
    let ram = await db.Ram.findOne({
      where: { id: data?.id },
    });
    if (ram) {
      await ram.update({ name: data.name });
      return res.status(200).json({
        message: "update ram success",
        code: 0,
      });
    } else {
      return res.status(200).json({
        message: "ram not exist",
        code: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let ram = await db.Ram.findOne({
      where: { id: id },
    });
    if (ram) {
      await ram.destroy();
      return res.status(200).json({
        message: "delete ram success",
        code: 0,
      });
    } else {
      return res.status(200).json({
        message: "ram not exist",
        code: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
};

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
