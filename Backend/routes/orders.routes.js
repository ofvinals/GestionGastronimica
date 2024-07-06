const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getOrders,
	getOrder,
	createOrder,
	deleteOrder,
	updateOrderPending 
} = require('../controllers/order.controller.js');

const router = express.Router();

router.get('/orders',  getOrders);
router.post('/orders',  createOrder)
router.get('/orders/:id',  getOrder);
router.delete('/orders/:id',  deleteOrder);
router.put('/orders', updateOrderPending);

// RUTA PARA ACTUALIZAR EL ESTADO PENDIENTE DE ITEMS DE LA ORDEN
// router.put('/orders/:tableId/updatePending', updateOrderPending);

module.exports = router;
