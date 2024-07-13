const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getOrders,
	getOrder,
	createOrder,
	deleteOrder,
	updateOrderPending,
	deleteItem,
	updateOrderOpen,
	updateItemCooked
} = require('../controllers/order.controller.js');

const router = express.Router();
router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.delete('/orders/:id', deleteOrder);
router.put('/orders', updateOrderPending);
router.delete('/orders/:orderId/items/:itemId', deleteItem);
router.put('/orders/:orderId/items/:itemId', updateItemCooked );

// Ruta específica para actualizar el estado de la orden
router.put('/orders/update', updateOrderOpen);  

module.exports = router;
