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

    if (!fullName || !userName || !password || !gender) { return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 }) }

    if (password.length < 6) { return res.status(400).json({ message: "mật khẩu phải ít nhất 6 ký tự", code: 1 }) }

    if (await checkUsernameExist(userName)) { return res.status(400).json({ message: "username đã tồn tại", code: 1 }) }

    const hashPassword = await hashAccountPassword(password);

    await db.User.create({
      full_name: fullName,
      username: userName,
      password: hashPassword,
      gender: gender,
      is_active: true,
      is_verified: false,
      is_master: false,
      position_id: 3
    });

    return res.status(201).json({ message: "đăng ký tài khoản thành công!", code: 0 });

  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};


// Login
const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  if (!key) { throw new Error('JWT_SECRET is not defined') }
  try {
    return jwt.sign(payload, key);
  } catch (error) {
    throw new Error('Failed to create JWT');
  }
};

const loginAccount = async (req, res) => {
  try {
    const { userName, password } = req?.body?.data;

    if (!userName || !password) { return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin", code: 1 }); }
    if (password.length < 6) { return res.status(400).json({ message: "mật khẩu phải ít nhất 6 ký tự", code: 1 }); }

    const user = await db.User.findOne({
      where: { username: userName },
      attributes: ["id", "full_name", "avatar", "username", "password", "email", "gender", "is_active", "is_verified", "position_id", "updatedAt", "createdAt"],
      include: { model: db.Position, attributes: ["id", "key_position", "name", 'desc', 'is_active', 'is_master', "updatedAt", "createdAt"] }
    });

    if (!user || !await checkPassword(password, user.password)) {
      return res.status(401).json({ message: "tài khoản hoặc mật khẩu không đúng", code: 1 });
    }

    const { id, full_name, avatar, email, gender, is_active, is_verified, position_id, createdAt, updatedAt } = user.dataValues;
    const userPosition = user?.dataValues?.Position?.dataValues;
    if (!userPosition?.is_master) {
      return res.status(401).json({ message: "tài khoản không phải là admin", code: 1 });
    }
    const payload = {
      userPresent: {
        user: { id, full_name, avatar, username: userName, email, gender, is_active, is_verified, position_id, createdAt, updatedAt },
        position: userPosition
      }
    };

    const token = await createJWT(payload);

    await res.cookie("jwt_admin", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_SECURE,
      sameSite: 'None'
    });
    return res.status(200).json({ message: "đăng nhập thành công", jwt_admin: req?.cookies?.jwt_admin });

  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};


// Logout
const logoutAccount = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie?.jwt_admin) {
      res.clearCookie("jwt_admin", { secure: process.env.NODE_ENV === 'production' });
      return res.status(200).json({ message: "đăng xuất thành công", code: 0 });
    } else {
      return res.status(400).json({ message: "No active session found", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};


// checkSession
const checkSession = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (cookie?.jwt_admin) {
      return res.status(200).json({ message: "check session success", jwt_admin: cookie.jwt_admin });
    } else {
      return res.status(401).json({ message: "No active session found", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error from server", code: -1 });
  }
};

module.exports = { registerAccount, loginAccount, logoutAccount, checkSession };

