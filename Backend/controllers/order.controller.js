const Order = require('../models/order.model.js');
const { DateTime } = require('luxon');

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createOrder = async (req, res) => {
	try {
		const ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires');
		const {
			salonName,
			tableNum,
			tableId,
			diners,
			server,
			cookedAt,
			items,
			orderOpen,
			elapsedDuration,
			receipt,
		} = req.body[0];
		const openAt = ahora.toISO();
		const newOrder = new Order({
			salonName,
			tableNum,
			tableId,
			openAt,
			cookedAt,
			diners,
			server,
			items,
			orderOpen,
			elapsedDuration,
			receipt,
		});
		await newOrder.save();
		res.json(newOrder);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		res.json(order);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrder = async (req, res) => {
	try {
		const { items, ...updateFields } = req.body;
		// busca la orden por ID
		const order = await Order.findById(req.params.id);
		// Si hay ítems en la solicitud, agrega nuevos
		if (items && Array.isArray(items)) {
			order.items = [...order.items, ...items];
		}
		// Actualiza los campos de la orden sin reemplazar los ítems
		Object.keys(updateFields).forEach((key) => {
			order[key] = updateFields[key];
		});
		// Guarda la orden actualizada
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrderPending = async (req, res) => {
	const { itemIds } = req.body;
	try {
		// Obtener todas las órdenes guardadas
		const orders = await Order.find();
		// Iterar sobre todas las órdenes
		orders.forEach(async (order) => {
			// Iterar sobre los IDs de los ítems modificados y actualiza `pending` a false
			itemIds.forEach((itemId) => {
				const itemToUpdate = order.items.find(
					(item) => item._id.toString() === itemId.toString()
				);
				if (itemToUpdate) {
					itemToUpdate.pending = false;
				}
			});
			await order.save();
		});
		res.json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateItemCooked = async (req, res) => {
	const { orderId, itemId } = req.params;
	const { cookedAt } = req.body;
	try {
		const order = await Order.findById(orderId);
		const item = order.items.id(itemId);
		item.cookedAt = cookedAt;
		await order.save();
		res.send(order);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrderOpen = async (req, res) => {
	try {
		const { closeTime, orderOpen, filteredOrder, elapsedDuration } = req.body;
		// Iterar sobre cada orden en filteredOrder
		for (const orderId of filteredOrder) {
			const order = await Order.findById(orderId);
			if (order) {
				order.orderOpen = orderOpen;
				order.closeTime = closeTime;
				order.elapsedDuration = elapsedDuration;
				await order.save();
			}
		}
		res.status(200).send('Estado de las órdenes actualizado correctamente');
	} catch (error) {
		console.error('Error en el servidor:', error);
		return res.status(500).json({ message: error.message });
	}
};

const updateCashOrder = async (req, res) => {
	const { id } = req.params;
	const {
		cash,
		additionalCharges,
		validFinalPrice,
		orderOpen,
		closeTime,
		elapsedDuration,
		receipt,
	} = req.body;

	try {
		const order = await Order.findById(id);
		order.orderCash = cash;
		order.additionalCharges = additionalCharges;
		order.finalPrice = validFinalPrice;
		order.orderOpen = orderOpen;
		order.closeTime = closeTime;
		order.elapsedDuration = elapsedDuration;
		order.receipt = receipt;
		await order.save();
		res.status(200).json({ message: 'Pago de la orden actualizado', order });
	} catch (error) {
		console.error('Error al actualizar el pago de la orden:', error);
		return res.status(500).json({ message: error.message });
	}
};

const deleteOrder = async (req, res) => {
	try {
		const deletedOrder = await Order.findByIdAndDelete(req.params.id);
		res.json(deletedOrder);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteItem = async (req, res) => {
	const { orderId, itemId } = req.params;
	try {
		const order = await Order.findById(orderId);
		const initialLength = order.items.length;
		order.items = order.items.filter(
			(item) => item._id.toString() !== itemId
		);
		await order.save();
		res.json(initialLength);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getOrder,
	getOrders,
	createOrder,
	updateOrder,
	updateOrderPending,
	updateItemCooked,
	updateOrderOpen,
	updateCashOrder,
	deleteOrder,
	deleteItem,
};
