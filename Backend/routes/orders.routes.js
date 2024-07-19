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
router.delete('/orders/:orderId/items/:itemId', deleteItem);
router.put('/orders/update-pending', updateOrderPending);

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.delete('/orders/:id', deleteOrder);
router.put('/orders/:id', updateOrder);

// // RUTA PRA AGREGAR HORA DE PRODUCCION EN COCINA
router.put('/orders/:orderId/items/:itemId', updateItemCooked);
// // RUTA PARA AGREGAR DATOS DEL PAGO DE LA ORDEN
router.put('/orders/:id/cash', updateCashOrder);
// // RUTA PARA MANEJAR LA APERTURA/CIERRE DE LA ORDEN
// router.put('/orders/update', updateOrderOpen);

module.exports = router;
