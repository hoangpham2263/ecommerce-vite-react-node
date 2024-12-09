const jwt = require('jsonwebtoken');
import db from "../models/index";
import { Op } from "sequelize";

const authCheckExistToken = (req, res, next) => {
  const token = req?.cookies?.jwt_admin
  if (!token) {
    return res.status(401).json({ message: 'Access denied: insufficient permissions' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.account = user?.userPresent
    next()
  })
}

const authCheckUserPermission = (key_role = null) => {
  return async (req, res, next) => {
    try {
      if (!req?.account) {
        return res.status(401).json({ message: "Tài khoản chưa đăng ký" });
      }
      if (req?.account?.position?.is_master) return next()
      return res.status(401).json({ message: "Tài khoản không phải là admin" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" })
    }
  };
};

module.exports = {
  authCheckExistToken, authCheckUserPermission
}