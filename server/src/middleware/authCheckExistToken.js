const jwt = require('jsonwebtoken');
import db from "../models/index";
import { Op } from "sequelize";

const authCheckExistToken = (req, res, next) => {
  const token = req?.cookies?.jwt
  if (!token) {
    return res.status(401).json({ message: 'Vui lòng đăng nhập' });
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
      if (req?.account?.position?.is_master) return next()
      if (req?.account) {
        let positionLogin = req.account.user.position_id;
        let isUser = await db.Position_Role.findOne({
          attributes: ["id", "PositionId", "RoleId"],
          where: { [Op.and]: [{ PositionId: positionLogin }, { RoleId: key_role }] }
        });
        if (isUser) { return next() }
        else { return res.status(403).json({ message: "Vui lòng đăng nhập" }) }
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" })
    }
  };
};

module.exports = {
  authCheckExistToken, authCheckUserPermission
}