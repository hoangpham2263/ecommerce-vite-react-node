require("dotenv").config();
import jwt from "jsonwebtoken";
import db from "../models/index";
import bcrypt from "bcryptjs";

// Register
const checkUsernameExist = async (username) => {
  let user = await db.User.findOne({ where: { username: username } });
  if (user) { return true; } return false;
};

const hashAccountPassword = async (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt); return hashPassword;
};
const checkPassword = async (inputPassword, hashPassword) => { return bcrypt.compareSync(inputPassword, hashPassword) };

const registerAccount = async (req, res) => {
  try {
    const { fullName, userName, password, gender } = req?.body?.data;

    if (!fullName || !userName || !password || !gender) {
      return res.status(200).json({ message: "missing required parameters", data: [] });
    }

    let isUsernameExist = await checkUsernameExist(userName);
    if (isUsernameExist) return { message: "The email is already exist", data: [] };

    if (password && password.length < 6) {
      return res.status(200).json({ message: "Your password must have more than 6 letters", data: [] });
    }

    let hashPassword = await hashAccountPassword(password);

    await db.User.create({
      full_name: fullName,
      username: userName,
      password: hashPassword,
      gender: gender,
      is_active: true,
      is_verified: false,
      is_master: false,
      position_id: 2
    });

    return res.status(200).json({ message: "account registration successful!", data: [] });
  } catch (error) {
    return res.status(500).json({ message: "error from server", data: [] });
  }
};

// Login
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};
const loginAccount = async (req, res) => {
  try {
    const { userName, password } = req?.body?.data;
    if (!userName || !password) {
      return res.status(200).json({ message: "missing required parameters", data: [] });
    }
    if (password && password.length < 6) {
      return res.status(200).json({ message: "Your password must have more than 6 letters", data: [] });
    }

    let user = await db.User.findOne({ where: { username: userName } });
    if (user) {
      let isCorrectPassword = await checkPassword(password, user.password);
      if (isCorrectPassword) {
        let { id, full_name, avatar, username, email, phone, gender, is_active, is_verified, is_master, position_id, createdAt, updatedAt } = user.dataValues;
        let payload = {
          user: { id, full_name, avatar, username, email, phone, gender, is_active, is_verified, is_master, position_id, createdAt, updatedAt },
        };
        let token = await createJWT(payload);

        await res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: process.env.NODE_SECURE,
          sameSite: 'None'
        });
        console.log(111)
        return res.status(200).json({ message: "login successful!", data: [] });
      }
    }
    return { message: "Your username or password is incorrect!", data: [] };
  } catch (error) {
    return res.status(500).json({ message: "error from server", data: [] });
  }
};

// Logout
const logoutAccount = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie?.jwt) {
      res.clearCookie("jwt", { secure: true, });
      return res.status(200).json({ message: "Logout user success", data: [] });
    } else {
      return res.status(200).json({ message: "Logout user error", data: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error from server", data: [] });
  }
};

// Read JWT
const readJWT = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie.jwt) {
      return res.status(200).json({ EM: "Read JWT success", EC: "0", DT: cookie, });
    } else {
      return res.status(200).json({ EM: "JWT not exists success", EC: "1", DT: [], });
    }
  } catch (error) {
    return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
  }
};

module.exports = { registerAccount, loginAccount, logoutAccount, readJWT };
