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

router.get('/products',authRequired,  getProducts);
router.post('/products',authRequired,  createProduct)
router.get('/products/:id', authRequired, getProduct);
router.delete('/products/:id', authRequired, deleteProduct);
router.put('/products/:id', authRequired, updateProduct);

module.exports = router;
