import db from "../models/index";
import bcrypt from 'bcryptjs'

const readFunc = async (req, res) => {
  try {
    let data
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "full_name", "avatar", "username", "password", "email", "gender", "is_active", "is_verified", "position_id", "updatedAt", "createdAt"],
        order: [["full_name", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, user: rows, }
    } else {
      data = await db.User.findAll({ attributes: ["id", "full_name", "avatar", "username", "password", "email", "gender", "is_active", "is_verified", "position_id", "updatedAt", "createdAt"], order: [["full_name", "ASC"]] })
    }
    return res.status(200).json({ message: "get user success", code: 0, data: data, });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const hashAccountPassword = async (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt); return hashPassword;
};
const createFunc = async (req, res) => {
  try {
    const { username, position_id } = req.body.data;
    if (!username || !position_id) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let hashPassword = await hashAccountPassword("123456");
    let data = await db.User.create({ full_name: username, username: username, password: hashPassword, is_active: true, is_verified: false, position_id: position_id });
    return res.status(200).json({ message: "a user is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let user = await db.User.findOne({ where: { id: data?.id } });
    if (user) {
      let hashPassword
      if (data?.password?.length > 0) hashPassword = await hashAccountPassword(data?.password)
      await user.update({ full_name: data.full_name, avatar: data.avatar, username: data.userName, password: hashPassword, email: data.email, gender: data.gender, is_active: data.is_active, is_verified: data.is_verified, position_id: data.position_id });
      return res.status(200).json({ message: "update user success", code: 0 });
    } else {
      return res.status(200).json({ message: "user not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id, is_active } = req.body;
    let user = await db.User.findOne({ where: { id: id, } });
    if (user) {
      await user.update({ is_active: is_active });
      if (is_active) { return res.status(200).json({ message: "enable success", code: 0 }); }
      else { return res.status(200).json({ message: "disable success", code: 0 }); }
    } else {
      return res.status(200).json({ message: "user not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
