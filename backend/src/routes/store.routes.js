const express = require('express');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { 
  getAllStores, 
  getStoreById, 
  getStoresByOwnerId, 
  createStore, 
  updateStore, 
  deleteStore 
} = require('../controllers/store.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all stores (owner and admin only)
router.get('/', authorize('owner', 'admin'), getAllStores);

// Get store by ID (owner and admin only)
router.get('/:id', authorize('owner', 'admin'), getStoreById);

// Get stores by owner ID (owner and admin only)
router.get('/owner/:ownerId', authorize('owner', 'admin'), getStoresByOwnerId);

// Create store (owner and admin only)
router.post('/', authorize('owner', 'admin'), createStore);

// Update store (owner and admin only)
router.put('/:id', authorize('owner', 'admin'), updateStore);

// Delete store (owner and admin only)
router.delete('/:id', authorize('owner', 'admin'), deleteStore);

module.exports = router;