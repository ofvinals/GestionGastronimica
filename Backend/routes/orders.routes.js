const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getOrders,
	getOrder,
	createOrder,
	deleteOrder,
	updateOrderPending,
	deleteItem,
	updateOrder,
	updateOrderOpen,
	updateItemCooked,
	updateCashOrder,
} = require('../controllers/order.controller.js');

const router = express.Router();
router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.delete('/orders/:id', deleteOrder);
router.put('/orders/:id', updateOrder);
router.put('/orders', updateOrderPending);
// RUTA PARA BORRAR UN ITEM DE LA ORDEN
router.delete('/orders/:orderId/items/:itemId', deleteItem);
// RUTA PRA AGREGAR HORA DE PRODUCCION EN COCINA
router.put('/orders/:orderId/items/:itemId', updateItemCooked);
// RUTA PARA AGREGAR DATOS DEL PAGO DE LA ORDEN
router.put('/orders/:id/cash', updateCashOrder);
// RUTA PARA MANEJAR LA APERTURA/CIERRE DE LA ORDEN
router.put('/orders/update', updateOrderOpen);

module.exports = router;
