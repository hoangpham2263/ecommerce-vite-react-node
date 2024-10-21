import db from "../models/index";
import bcrypt from 'bcryptjs'
import { UploadCloud } from '../utility/UploadCloud'

const readFunc = async (req, res) => {
  try {
    let data
    if (req?.query?.page && req?.query?.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "full_name", "avatar", "username", "password", "email", "gender", "is_active", "is_verified", "position_id", "updatedAt", "createdAt"],
        order: [["full_name", "ASC"]],
        include: [
          { model: db.Position, attributes: ["id", "key_position", "name", "desc", "state", "is_master", "updatedAt", "createdAt"] },
        ],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, user: rows, }
    } else {
      data = await db.User.findAll({
        attributes: ["id", "full_name", "avatar", "username", "password", "email", "gender", "is_active", "is_verified", "position_id", "updatedAt", "createdAt"],
        order: [["full_name", "ASC"]],
        include: [
          { model: db.Position, attributes: ["id", "key_position", "name", "desc", "state", "is_master", "updatedAt", "createdAt"] },
        ],
      })
    }
    return res.status(200).json({ message: "get user success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const hashAccountPassword = async (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt); return hashPassword;
};
const checkUsernameExist = async (username) => {
  let user = await db.User.findOne({ where: { username: username } });
  if (user) { return true; } return false;
};
const createFunc = async (req, res) => {
  try {
    const { username } = req.body.data;
    if (await checkUsernameExist(username)) { return res.status(200).json({ message: "The username already exists", code: 1 }) }
    if (!username) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let hashPassword = await hashAccountPassword("123456");
    let data = await db.User.create({ full_name: username, username: username, password: hashPassword, is_active: true, is_verified: false, position_id: 3 });
    return res.status(200).json({ message: "a user is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    const data = req?.body?.data;
    const user = await db.User.findOne({ where: { id: data?.id } });
    if (user) {
      let hashPassword = data?.password && data.password.length > 0 ? await hashAccountPassword(data.password) : undefined;
      let avatarAfterUploadCloud = data?.avatar ? await UploadCloud(data.avatar, "imageAvatar") : undefined;
      await user.update({ full_name: data.fullName, avatar: avatarAfterUploadCloud || user.avatar, username: data.username, password: hashPassword || user.password, email: data.email, gender: data.gender, is_active: data.is_active, is_verified: data.is_verified, position_id: data.position });
      return res.status(200).json({ message: "Update user success", code: 0 });
    } else {
      return res.status(404).json({ message: "User not exist", code: 1 });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};



const deleteFunc = async (req, res) => {
  try {
    let { id } = req?.body;
    let user = await db.User.findOne({ where: { id: id, } });
    if (user) {
      await user.destroy();
      return res.status(200).json({ message: "delete user success", code: 0 })
    } else {
      return res.status(200).json({ message: "user not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

// const deleteFunc = async (req, res) => {
//   try {
//     let { id } = req.body;
//     let user = await db.User.findOne({ where: { id: id, } });
//     if (user) {
//       await user.update({ is_active: is_active });
//       if (is_active) { return res.status(200).json({ message: "enable success", code: 0 }); }
//       else { return res.status(200).json({ message: "disable success", code: 0 }); }
//     } else {
//       return res.status(200).json({ message: "user not exist", code: 1 });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "error from server", code: -1 });
//   }
// }

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
