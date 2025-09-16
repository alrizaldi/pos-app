const db = require('../config/db');

class Product {
  static async create(productData) {
    const { ownerId, storeId, sku, name, description, uom, costPrice, sellPrice, weight, categoryId, supplierId, stockTracking } = productData;
    
    const [result] = await db.execute(
      'INSERT INTO products (owner_id, store_id, sku, name, description, uom, cost_price, sell_price, weight, category_id, supplier_id, stock_tracking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [ownerId, storeId, sku, name, description, uom, costPrice, sellPrice, weight, categoryId, supplierId, stockTracking]
    );
    
    return result.insertId;
  }
  
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  }
  
  static async findByStoreId(storeId) {
    const [rows] = await db.execute('SELECT * FROM products WHERE store_id = ?', [storeId]);
    return rows;
  }
  
  static async update(id, productData) {
    const { ownerId, storeId, sku, name, description, uom, costPrice, sellPrice, weight, categoryId, supplierId, stockTracking } = productData;
    
    const [result] = await db.execute(
      'UPDATE products SET owner_id = ?, store_id = ?, sku = ?, name = ?, description = ?, uom = ?, cost_price = ?, sell_price = ?, weight = ?, category_id = ?, supplier_id = ?, stock_tracking = ? WHERE id = ?',
      [ownerId, storeId, sku, name, description, uom, costPrice, sellPrice, weight, categoryId, supplierId, stockTracking, id]
    );
    
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Product;