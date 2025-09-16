const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Debug logging
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

    // Check if user exists
    const user = await User.findByUsername(username);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove password from user object
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Create user
    const userId = await User.create({
      username,
      email,
      password,
      fullName,
      roleId: 5, // Default to cashier role
      phone: null,
      storeId: null,
      isActive: true,
    });

    res.status(201).json({ success: true, data: { id: userId } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, register };
