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
      return res.status(200).json({ message: "missing required parameters", code: 1, data: [] });
    }
    let isUsernameExist = await checkUsernameExist(userName);
    if (isUsernameExist) return res.status(200).json({ message: "The username is already exist", code: 1, data: [] });

    if (password && password.length < 6) {
      return res.status(200).json({ message: "Your password must have more than 6 letters", code: 1, data: [] });
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
    return res.status(200).json({ message: "account registration successful!", code: 0, data: [] });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1, data: [] });
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
      return res.status(200).json({ message: "missing required parameters", code: 1, data: [] });
    }
    if (password && password.length < 6) {
      return res.status(200).json({ message: "Your password must have more than 6 letters", code: 1, data: [] });
    }

    let user = await db.User.findOne({ where: { username: userName }, include: { model: db.Position, attributes: ["id", "key_position", "name", 'desc', 'state', 'is_master'] }, });
    if (user) {
      let isCorrectPassword = await checkPassword(password, user.password);
      if (isCorrectPassword) {
        let { id, full_name, avatar, username, email, phone, gender, is_active, is_verified, position_id, createdAt, updatedAt } = user.dataValues;
        let userPosition = user?.dataValues?.Position?.dataValues
        let payload = {
          userPresent: {
            user: { id, full_name, avatar, username, email, phone, gender, is_active, is_verified, position_id, createdAt, updatedAt },
            position: userPosition
          }
        };
        let token = await createJWT(payload);

        await res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: process.env.NODE_SECURE,
          sameSite: 'None'
        });
        return res.status(200).json({ message: "login successful!", code: 0, data: [] });
      }
    }
    return { message: "Your username or password is incorrect!", code: 1, data: [] };
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1, data: [] });
  }
};

// Logout
const logoutAccount = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie?.jwt) {
      res.clearCookie("jwt", { secure: true, });
      return res.status(200).json({ message: "Logout user success", code: 0, data: [] });
    } else {
      return res.status(500).json({ message: "Logout user error", code: 1, data: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1, data: [] });
  }
};

// Read JWT
const readJWT = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie?.jwt) {
      return res.status(200).json({ message: "Read JWT success", code: 0, data: cookie });
    } else {
      return res.status(500).json({ message: "JWT not exists success", code: 1, data: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1, data: [] });
  }
};

module.exports = { registerAccount, loginAccount, logoutAccount, readJWT };
