const Order = require('../models/order.model.js');

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createOrder = async (req, res) => {
	console.log(req.body)
	try {
		const {
			salonName,
			tableNum,
			tableId,
			openAt,
			diners,
			server,
			items,
			orderOpen,
		} = req.body[0];
		const newOrder = new Order({
			salonName,
			tableNum,
			tableId,
			openAt,
			diners,
			server,
			items,
			orderOpen,
		});

		await newOrder.save();

		res.json(newOrder);
	} catch (error) {
		console.error('Error al guardar la orden:', error);
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

const updateOrderPending = async (req, res) => {
	const { itemIds } = req.body;
	try {
		// Obtener todas las órdenes guardadas
		const orders = await Order.find();
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
			// Guardar la orden actualizada con pending false
			await order.save();
		});
		// Responder con un mensaje de éxito
		res.status(200).json({ message: 'Item actualizado correctamente' });
	} catch (error) {
		console.error('Error al actualizar item:', error);
		res.status(500).json({ message: 'Error al actualizar item' });
	}
};

const updateOrderOpen = async (req, res) => {
	console.log(req.body);
	try {
		const { closeTime, orderOpen, filteredOrder } = req.body;
		console.log(closeTime);
		// Iterar sobre cada orden en filteredOrder
		for (const orderId of filteredOrder) {
			const order = await Order.findById(orderId);
			if (order) {
				order.orderOpen = orderOpen;
				order.closeTime = closeTime;
				await order.save();
			}
		}
		res.status(200).send('Estado de las órdenes actualizado correctamente');
	} catch (error) {
		console.error('Error en el servidor:', error);
		res.status(500).send('Error al actualizar el estado de las órdenes');
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
		res.status(500).json({ message: 'Error deleting item from order' });
	}
};

module.exports = {
	getOrder,
	getOrders,
	createOrder,
	updateOrderPending,
	updateOrderOpen,
	deleteOrder,
	deleteItem,
};
