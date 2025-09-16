const db = require('../config/db');

class Store {
  static async create(storeData) {
    const { ownerId, name, address, phone, timezone, currency, isActive } = storeData;
    
    const [result] = await db.execute(
      'INSERT INTO stores (owner_id, name, address, phone, timezone, currency, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ownerId, name, address, phone, timezone, currency, isActive]
    );
    
    return result.insertId;
  }
  
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM stores WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM stores');
    return rows;
  }
  
  static async findByOwnerId(ownerId) {
    const [rows] = await db.execute('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
    return rows;
  }
  
  static async update(id, storeData) {
    const { ownerId, name, address, phone, timezone, currency, isActive } = storeData;
    
    const [result] = await db.execute(
      'UPDATE stores SET owner_id = ?, name = ?, address = ?, phone = ?, timezone = ?, currency = ?, is_active = ? WHERE id = ?',
      [ownerId, name, address, phone, timezone, currency, isActive, id]
    );
    
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM stores WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Store;