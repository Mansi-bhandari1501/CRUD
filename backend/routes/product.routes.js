// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const  authentication  =require("../middlewares/auth.middleware.js");
const  upload  =require("../middlewares/upload.middleware.js");
const ProductController = require('../controller/product.contoller');

// Routes for products
router.get('/',authentication, ProductController.getProducts);
router.get('/product',authentication, ProductController.getProductById);
router.post('/',authentication,upload, ProductController.createProduct);
router.put('/update/:id',authentication,upload, ProductController.updateProduct);
router.delete('/delete/:id',authentication, ProductController.deleteProduct);

module.exports = router;
