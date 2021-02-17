const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

// var jsonParser = bodyParser.json()

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Create -> POST
router.post('/product',productController.createProduct);

// Read -> GET

router.get('/products',productController.getAllProducts);


module.exports = router;
