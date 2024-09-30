import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Position_Role.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "position_id", "role_id","updatedAt","createdAt"],
        order: [["position_id", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, positionRoles: rows, }
    } else {
      data = await db.Position_Role.findAll({ attributes: ["id", "position_id", "role_id","updatedAt","createdAt"], order: [["position_id", "ASC"]] })
    }
    return res.status(200).json({ message: "get position role success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { position_id, role_id } = req.body.data;
    if (!position_id || !role_id) return res.status(200).json({ message: "missing required parameters", code: 1});
    let data = await db.Position_Role.create({ PositionId: position_id, RoleId: role_id });
    return res.status(200).json({ message: "a position role is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let positionRole = await db.Position_Role.findOne({ where: { id: data?.id, }, });
    if (positionRole) {
      await positionRole.update({ PositionId: data.position_id, RoleId: data.role_id });
      return res.status(200).json({ message: "update position success", code: 0 });
    } else {
      return res.status(200).json({ message: "position role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let positionRole = await db.Position_Role.findOne({ where: { id: id, }, });
    if (positionRole) {
      await positionRole.destroy();
      return res.status(200).json({ message: "delete position role success", code: 0 });
    } else {
      return res.status(200).json({ message: "position role not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
