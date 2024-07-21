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
router.delete('/orders/:orderId/items/:itemId',authRequired, deleteItem);
router.put('/orders/update-pending',authRequired, updateOrderPending);

router.get('/orders',authRequired, getOrders);
router.post('/orders',authRequired, createOrder);
router.get('/orders/:id',authRequired, getOrder);
router.delete('/orders/:id',authRequired, deleteOrder);
router.put('/orders/:id', authRequired, updateOrder);

// // RUTA PRA AGREGAR HORA DE PRODUCCION EN COCINA
router.put('/orders/:orderId/items/:itemId',authRequired, updateItemCooked);
// // RUTA PARA AGREGAR DATOS DEL PAGO DE LA ORDEN
router.put('/orders/:id/cash',authRequired, updateCashOrder);
// // RUTA PARA MANEJAR LA APERTURA/CIERRE DE LA ORDEN
// router.put('/orders/update', updateOrderOpen);

module.exports = router;
