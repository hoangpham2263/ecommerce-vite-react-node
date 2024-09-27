require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
// import { getGroupWithRoles } from "./JWTService";
// import { createJWT } from "../middleware/JWTAction";

// Register

// Check Email
const checkEmailExist = async (email) => {
  let user = await db.User.findOne({ where: { email: email, }, });
  if (user) { return true; } return false;
};

// Check Phone
const checkPhoneExist = async (phone) => {
  let user = await db.User.findOne({ where: { phone: phone, }, });
  if (user) { return true; } return false;
};

// Hash Password
const hashUserPassword = async (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const registerAccount = async (req, res) => {
  try {
    const { fullName, username, phone, email, password, confirmPassword, gender } = req?.body?.data;

    if (!fullName || !username || !phone || !email || !password || !confirmPassword || !gender) {
    console.log(">>>>>>>>>>", req?.body?.data)

      return res.status(200).json({ message: "missing required parameters", data: [] });
    }

    let isEmailExist = await checkEmailExist(email.email);
    if (isEmailExist) return { message: "The email is already exist", data: "", };

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) return { message: "The phone is already exist", data: [] };

    if (password && password.length <= 6) {
      return res.status(200).json({ message: "Your password must have more than 6 letters", data: [] });
    }

    let hashPassword = await hashUserPassword(password);


    //     await db.User.create({
    //       lastName: rawUserData.lastName,
    //       firstName: rawUserData.firstName,
    //       email: rawUserData.email,
    //       password: hashPassword,
    //       phone: rawUserData.phone,
    //       sex: rawUserData.sex,
    //       groupId: 3,
    //     });

    return res.status(200).json({ message: "A user is created successfully!", data: [] });
  } catch (error) {
    // return res.status(500).json({ message: "error from server", data: [] });
  }
};

// Login
// const loginUser = async (req, res) => {
//   try {
//     if (!req.body.data.valueLogin || !req.body.data.password) {
//       return res.status(200).json({ EM: "Missing required parameters", EC: 1, DT: "", });
//     }
//     if (req.body.data.password && req.body.data.password.length < 6) {
//       return res.status(200).json({ EM: "Your password must have more than 6 letters", EC: 1, DT: "", });
//     }

//     let data = await registerLoginService.handleLoginUser(req.body.data);

//     await res.cookie("jwt", data.DT.access_token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       secure: "production" === 'production',
//       SameSite: "None"
//     });

//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT, });
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

// Read JWT
// const readJWT = async (req, res) => {
//   try {
//     const cookie = req.cookies;
//     if (cookie.jwt) {
//       return res.status(200).json({ EM: "Read JWT success", EC: "0", DT: cookie, });
//     } else {
//       return res.status(200).json({ EM: "JWT not exists success", EC: "1", DT: [], });
//     }
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

// Logout
// const logoutUser = async (req, res) => {
//   try {
//     const cookie = req.cookies;
//     if (cookie?.jwt) {
//       res.clearCookie("jwt", { secure: true, });

//       return res.status(200).json({ EM: "Logout user success", EC: 0, DT: [], });
//     } else {
//       return res.status(200).json({ EM: "Logout user error", EC: 1, DT: [], });
//     }
//   } catch (error) {
//     return res.status(500).json({ EM: "Error from server", EC: -1, DT: [], });
//   }
// };

module.exports = { registerAccount };
