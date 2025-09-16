const Store = require('../models/store.model');

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStoresByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const stores = await Store.findByOwnerId(ownerId);
    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createStore = async (req, res) => {
  try {
    const storeId = await Store.create(req.body);
    res.status(201).json({ success: true, data: { id: storeId } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Store.update(id, req.body);
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    
    res.json({ success: true, message: 'Store updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Store.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    
    res.json({ success: true, message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  getStoresByOwnerId,
  createStore,
  updateStore,
  deleteStore
};