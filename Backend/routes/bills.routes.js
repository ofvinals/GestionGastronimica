const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getBills,
	getBill,
	createBill,
	deleteBill,
	updateBill,
} = require('../controllers/bill.controller.js');

const router = express.Router();

router.get('/bills',authRequired,  getBills);
router.post('/bills',authRequired,  createBill)
router.get('/bills/:id', authRequired, getBill);
router.delete('/bills/:id', authRequired, deleteBill);
router.put('/bills/:id', authRequired, updateBill);

module.exports = router;
