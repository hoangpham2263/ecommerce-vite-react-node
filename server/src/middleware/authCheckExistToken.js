const jwt = require('jsonwebtoken');
import db from "../models/index";
import { Op } from "sequelize";

const authCheckExistToken = (req, res, next) => {
  const token = req?.cookies?.jwt
  if (!token) {
    return res.status(401).json({ message: 'Access denied: insufficient permissions', code: 1 });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden', code: 1 });
    }
    req.account = user.userPresent
    next()
  })
}

const authCheckUserPermission = (key_role) => {
  return async (req, res, next) => {
    try {
      if (req?.account) {
        let positionLogin = req.account.user.position_id;
        let isUser = await db.Position_Role.findOne({
          attributes: ["id", "position_id", "role_id"],
          where: { [Op.and]: [{ position_id: positionLogin }, { role_id: key_role }] }
        });
        if (isUser) {
          next()
        } else { return res.status(403).json({ message: "Access denied: insufficient permissions", code: 1 }) }
      } else { return res.status(401).json({ message: "Not authenticated the user", code: 1 }) }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", code: -1 })
    }
  };
};


module.exports = {
  authCheckExistToken, authCheckUserPermission
}