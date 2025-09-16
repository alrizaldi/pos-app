const express = require("express");
const authenticate = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users (owner and superadmin only)
router.get("/", authorize("owner", "superadmin"), getAllUsers);

// Get user by ID (owner and superadmin only)
router.get("/:id", authorize("owner", "superadmin"), getUserById);

// Create user (owner and superadmin only)
router.post("/", authorize("owner", "superadmin"), createUser);

// Update user (owner and superadmin only)
router.put("/:id", authorize("owner", "superadmin"), updateUser);

// Delete user (owner and superadmin only)
router.delete("/:id", authorize("owner", "superadmin"), deleteUser);

module.exports = router;
