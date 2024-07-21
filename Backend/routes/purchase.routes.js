const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getPurchase,
	getPurchases,
	createPurchase,
	deletePurchase,
	updatePurchase,
} = require('../controllers/purchase.controller.js');

const router = express.Router();

router.get('/purchase', authRequired, getPurchases);
router.get('/purchase/:id', authRequired, getPurchase);
router.post ('/purchase', authRequired, createPurchase);
router.delete('/purchase/:id', authRequired, deletePurchase);
router.put('/purchase/:id', authRequired, updatePurchase);

module.exports = router;
