const express = require('express');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { 
  getAllProducts, 
  getProductById, 
  getProductsByStoreId, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/product.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Get products by store ID
router.get('/store/:storeId', getProductsByStoreId);

// Create product (manager, owner and admin only)
router.post('/', authorize('manager', 'owner', 'admin'), createProduct);

// Update product (manager, owner and admin only)
router.put('/:id', authorize('manager', 'owner', 'admin'), updateProduct);

// Delete product (manager, owner and admin only)
router.delete('/:id', authorize('manager', 'owner', 'admin'), deleteProduct);

module.exports = router;