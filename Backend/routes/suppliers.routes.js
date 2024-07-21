const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getSuppliers,
	getSupplier,
	createSupplier,
	deleteSupplier,
	updateSupplier,
} = require('../controllers/supplier.controller.js');

const router = express.Router();

router.get('/suppliers', authRequired, getSuppliers);
router.get('/suppliers/:id',authRequired,  getSupplier);
router.post ('/suppliers', authRequired, createSupplier);
router.delete('/suppliers/:id', authRequired, deleteSupplier);
router.put('/suppliers/:id', authRequired, updateSupplier);

module.exports = router;
