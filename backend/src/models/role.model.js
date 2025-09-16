const db = require("../config/db");
const bcrypt = require("bcryptjs");

class Role {
  static async create(roleData) {
    const { name, description } = roleData;

    const [result] = await db.execute(
      "INSERT INTO roles (name, description) VALUES (?, ?)",
      [name, description]
    );

    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM roles WHERE role_id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM roles");
    return rows;
  }

  static async update(id, roleData) {
    const { name, description } = roleData;

    const [result] = await db.execute(
      "UPDATE roles SET name = ?, description = ? WHERE role_id = ?",
      [name, description, id]
    );

    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM roles WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Role;
