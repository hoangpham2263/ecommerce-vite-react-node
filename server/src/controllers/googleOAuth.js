require("dotenv").config();
import axios from 'axios';
import db from "../models/index";
import jwt from "jsonwebtoken";

const loginGoogleOAuth = async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code',
      },
    });
    res.json(tokenResponse.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      res.status(error.response.status).send('Error exchanging code for token');
    } else {
      console.error('Error Message:', error.message);
      res.status(500).send('Error exchanging code for token');
    }
  }
};

// save account google oauth to database
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

const checkEmailExist = async (email) => {
  let user = await db.User.findOne({ where: { email: email, }, });
  if (user) { return true; } return false;
};

const saveAccountGoogleOAuth = async (req, res) => {
  try {
    const { name, email, picture, email_verified } = req?.body?.data;
    if (!name || !email || !picture || !email_verified) {
      return res.status(200).json({ message: "missing required parameters", code: 1, data: [] });
    }

    let isEmailExist = await checkEmailExist(email);
    if (!isEmailExist) {
      await db.User.create({
        full_name: name,
        avatar: picture,
        email: email,
        is_verified: email_verified,
        is_active: true,
        is_verified: true,
        is_master: false,
        position_id: 1
      });
    }

    let user = await db.User.findOne({ where: { email: email } });
    if (user?.dataValues) {
      let { id, full_name, avatar, username, email, phone, gender, is_active, is_verified, is_master, position_id, createdAt, updatedAt } = user?.dataValues;
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
      return res.status(200).json({ message: "login successful", code: 0, data: [] });
    }
    return res.status(200).json({ message: "system error", code: 1, data: [] });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1, data: [] });
  }
}

module.exports = { loginGoogleOAuth, saveAccountGoogleOAuth }

