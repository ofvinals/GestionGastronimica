const Order = require('../models/order.model.js');
const moment = require('moment-timezone');

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
const createOrder = async (req, res) => {
	console.log(req.body);
	try {
		const { salonName, tableNum, tableId, diners, items, orderOpen } =
			req.body[0];
		const createdAt = moment().tz('America/Argentina/Buenos_Aires').toDate();

		const newOrder = new Order({
			salonName,
			tableNum,
			diners,
			tableId,
			items,
			orderOpen,
			createdAt,
		});

		await newOrder.save();

		res.json(newOrder);
	} catch (error) {
		console.error('Error al guardar la order:', error);
	}
};

const getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order)
			return res.status(404).json({ message: 'Order no encontrada' });
		res.json(order);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrderPending = async (req, res) => {
	const { itemIds } = req.body;
	console.log('itemIds', itemIds);

	try {
		// Obtener todas las órdenes
		const orders = await Order.find();

		if (!orders || orders.length === 0) {
			return res.status(404).json({ message: 'No orders found' });
		}

		// Iterar sobre todas las órdenes
		orders.forEach(async (order) => {
			// Iterar sobre los IDs de los ítems modificados y actualizar `pending` a false
			itemIds.forEach((itemId) => {
				const itemToUpdate = order.items.find(
					(item) => item._id.toString() === itemId.toString()
				);
				if (itemToUpdate) {
					itemToUpdate.pending = false;
				}
			});

			// Guardar la orden actualizada
			await order.save();
		});

		// Responder con un mensaje de éxito
		res.status(200).json({ message: 'Pending items updated successfully' });
	} catch (error) {
		console.error('Error updating orders:', error);
		res.status(500).json({ message: 'Error updating orders' });
	}
};

const deleteOrder = async (req, res) => {
	try {
		const deletedOrder = await Order.findByIdAndDelete(req.params.id);
		if (!deletedOrder)
			return res.status(404).json({ message: 'Order no encontrada' });
		res.json(deletedOrder);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getOrder,
	getOrders,
	createOrder,
	updateOrderPending,
	deleteOrder,
};
