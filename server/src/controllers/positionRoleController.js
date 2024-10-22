import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    let { page, limit, position_id } = req.query
    if (page && limit && position_id) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Position_Role.findAndCountAll({
        where: { PositionId: position_id },
        offset: offset,
        limit: limit,
        attributes: ["id", "PositionId", "RoleId", "updatedAt", "createdAt"],
        order: [["PositionId", "ASC"]],
        include: [
          { model: db.Position, attributes: ["id", "key_position", "name", "desc", "is_active", "is_master", "updatedAt", "createdAt"] },
          { model: db.Role, attributes: ["id", "key_role", "name", "updatedAt", "createdAt"] }
        ],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, positionRole: rows, }
    } else {
      data = await db.Position_Role.findAll({
        attributes: ["id", "PositionId", "RoleId", "updatedAt", "createdAt"], order: [["PositionId", "ASC"]],
        include: [
          { model: db.Position, attributes: ["id", "key_position", "name", "desc", "is_active", "is_master", "updatedAt", "createdAt"] },
          { model: db.Role, attributes: ["id", "key_role", "name", "updatedAt", "createdAt"] }
        ],
      })
    }
    return res.status(200).json({ message: "get position role success", code: 0, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const readFuncReverse = async (req, res) => {
  try {
    let data;
    const { page, limit, position_id } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const assignedRoles = await db.Position_Role.findAll({
      where: { PositionId: position_id },
      attributes: ['RoleId'],
    });

    const assignedRoleIds = assignedRoles.map(role => role.RoleId);

    const rolesNotAssigned = await db.Role.findAndCountAll({
      where: {
        id: {
          [db.Sequelize.Op.notIn]: assignedRoleIds,
        },
      },
      offset: offset,
      limit: limitNumber,
      attributes: ['id', 'key_role', 'name'],
      order: [['key_role', 'ASC']],
    });

    const count = rolesNotAssigned.count

    const totalPages = Math.ceil(count / limitNumber);

    data = {totalRows: count,totalPages: totalPages,rolesNotAssigned: rolesNotAssigned.rows}

    return res.status(200).json({ message: 'get roles without position success', code: 0, data: data })
  } catch (error) {
    return res.status(500).json({ message: 'Error from server', code: -1 });
  }
}


const createFunc = async (req, res) => {
  try {
    const { PositionId, RoleId } = req.body.data;
    if (!PositionId || !RoleId) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Position_Role.create({ PositionId: PositionId, RoleId: RoleId });
    return res.status(200).json({ message: "a position role is created successfully", code: 0, data: data });
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

module.exports = { readFunc, createFunc, deleteFunc, readFuncReverse };
