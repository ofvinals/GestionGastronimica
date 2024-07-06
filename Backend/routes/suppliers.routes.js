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

router.get('/suppliers',  getSuppliers);
router.get('/suppliers/:id',  getSupplier);
router.post ('/suppliers',  createSupplier);
router.delete('/suppliers/:id',  deleteSupplier);
router.put('/suppliers/:id',  updateSupplier);

module.exports = router;
