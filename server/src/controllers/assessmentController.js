import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Assessment.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "UserId", "ProductId", "rate", "comment", "updatedAt", "createdAt"],
        order: [["UserId", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, assessment: rows, }
    } else {
      data = await db.Assessment.findAll({ attributes: ["id", "UserId", "ProductId", "rate", "comment", "updatedAt", "createdAt"], order: [["UserId", "ASC"]] })
    }
    return res.status(200).json({ message: "get assessment success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { UserId, ProductId, rate, comment } = req.body.data;
    if (!UserId || !ProductId || !rate || !comment) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Assessment.create({ UserId: UserId, ProductId: ProductId, rate: rate, comment: comment });
    return res.status(200).json({ message: "a assessment is created successfully", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let assessment = await db.Assessment.findOne({ where: { id: data?.id, }, });
    if (assessment) {
      const a = await assessment.update({ UserId: data.UserId, ProductId: data.ProductId, rate: data.rate, total: data.total });
      return res.status(200).json({ message: "update assessment success", code: 0, data: a });
    } else {
      return res.status(200).json({ message: "assessment not exist", code: 1 });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let assessment = await db.Assessment.findOne({ where: { id: id, }, });
    if (assessment) {
      await assessment.destroy();
      return res.status(200).json({ message: "delete assessment success", code: 0 });
    } else {
      return res.status(200).json({ message: "assessment not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
