const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async create(userData) {
    const {
      username,
      email,
      password,
      fullName,
      roleId,
      phone,
      storeId,
      isActive,
    } = userData;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.execute(
      "INSERT INTO users (username, email, password_hash, full_name, role_id, phone, store_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        email,
        hashedPassword,
        fullName,
        roleId,
        phone,
        storeId,
        isActive,
      ]
    );

    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute(
      "SELECT user_id, username, email, full_name, role_id, phone, store_id, is_active, created_at FROM users"
    );
    return rows;
  }

  static async update(id, userData) {
    const { username, email, fullName, roleId, ownerId, storeId, isActive } =
      userData;

    const [result] = await db.execute(
      "UPDATE users SET username = ?, email = ?, full_name = ?, role_id = ?, phone = ?, store_id = ?, is_active = ? WHERE id = ?",
      [username, email, fullName, roleId, ownerId, storeId, isActive, id]
    );

    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = User;
