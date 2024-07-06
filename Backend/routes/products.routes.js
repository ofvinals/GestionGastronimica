const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getProducts,
	getProduct,
	createProduct,
	deleteProduct,
	updateProduct,
} = require('../controllers/product.controller.js');

const router = express.Router();

router.get('/products',  getProducts);
router.post('/products',  createProduct)
router.get('/products/:id',  getProduct);
router.delete('/products/:id',  deleteProduct);
router.put('/products/:id',  updateProduct);

module.exports = router;
