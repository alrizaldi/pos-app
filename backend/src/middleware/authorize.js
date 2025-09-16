const { get } = require("../app");
const db = require("../config/db");
const Role = require("../models/role.model");

const authorize = (...roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No user found." });
    }

    const getRoleName = await Role.findById(req.user.role);

    if (!roles.includes(getRoleName.role_name)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

module.exports = authorize;
