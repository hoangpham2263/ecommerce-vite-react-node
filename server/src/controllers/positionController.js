import { where } from "sequelize";
import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Position.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "key_position", "name", "desc", "is_active", "is_master", "updatedAt", "createdAt"],
        order: [["key_position", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, position: rows, }
    } else {
      data = await db.Position.findAll({ attributes: ["id", "key_position", "name", "desc", "is_active", "is_master", "updatedAt", "createdAt"], order: [["key_position", "ASC"]] })
    }
    return res.status(200).json({ message: "get positions success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const readFuncIsMaster = async (req, res) => {
  try {
    const { position_id } = req.query;

    if (!position_id) { return res.status(200).json({ message: "position_id is required", code: -2 }); }

    const position = await db.Position.findOne({
      where: { key_position: position_id },
      attributes: ["id", "key_position", "name", "desc", "is_active", "is_master", "updatedAt", "createdAt"],
    });

    if (!position) { return res.status(200).json({ message: "Position not found", code: -3 }); }

    return res.status(200).json({ message: "Get check is master success", code: 0, data: position.is_master, });
  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};


const createFunc = async (req, res) => {
  try {
    const { key_position, name, desc } = req.body.data;
    if (!key_position || !name) return res.status(200).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 });

    const existingPosition = await db.Position.findOne({ where: { key_position } });
    if (existingPosition) {
      return res.status(200).json({ message: "Key Position đã tồn tại", code: 2 });
    }

    let data = await db.Position.create({ key_position: key_position, name: name, desc: desc, is_active: true, is_master: false });
    return res.status(200).json({ message: "Thêm Position thành công", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data;
    let position = await db.Position.findOne({ where: { id: data?.id } });

    if (position) {
      if (data.key_position) {
        let existingPosition = await db.Position.findOne({ where: { key_position: data.key_position, id: { [db.Sequelize.Op.ne]: data.id } } });
        if (existingPosition) {
          return res.status(200).json({ message: "key_position phải là duy nhất", code: 2 });
        }
      }
      await position.update({
        key_position: data.key_position !== undefined ? data.key_position : position.key_position,
        name: data.name !== undefined ? data.name : position.name,
        desc: data.desc !== undefined ? data.desc : position.desc,
        is_active: data.is_active !== undefined ? data.is_active : position.is_active,
        is_master: data.is_master !== undefined ? data.is_master : position.is_master
      });

      return res.status(200).json({ message: "Cập nhật thành công", code: 0 });
    } else {
      return res.status(200).json({ message: "position not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}


const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let position = await db.Position.findOne({ where: { id: id, }, });
    if (position) {
      await position.destroy();
      return res.status(200).json({ message: "Xóa position thành công", code: 0 });
    } else {
      return res.status(200).json({ message: "position không tồn tại", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, readFuncIsMaster, createFunc, updateFunc, deleteFunc };
