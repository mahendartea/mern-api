const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

// Create -> POST
router.post('/product',productController.createProduct);

// Read -> GET

router.get('/products',productController.getAllProducts);


module.exports = router;
