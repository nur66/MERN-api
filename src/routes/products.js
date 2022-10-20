const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

// CREATE - POST
router.post('/product', productController.createProduct);

// READ - GET
router.get('/products', productController.getAllProducts);

// Tes Get Param
router.get('/tes', productController.tesGetParram);

module.exports = router;