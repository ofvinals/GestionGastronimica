const Order = require('../models/order.model.js');
const { DateTime } = require('luxon'); // Importa DateTime desde Luxon

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
		} = req.body[0];
		const openAt = ahora.toISO();
		// Crea una nueva instancia de Order utilizando los datos obtenidos
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
		});

		// Guarda la nueva orden en la base de datos
		await newOrder.save();

		res.json(newOrder); // Devuelve la orden creada como respuesta
	} catch (error) {
		console.error('Error al guardar la orden:', error);
		res.status(500).json({ error: 'Error al guardar la orden' });
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
		const {
			salonName,
			tableNum,
			tableId,
			diners,
			server,
			orderOpen,
			openAt,
			closeTime,
			elapsedDuration,
			orderCash,
			finalPrice,
			additionalCharges,
			items,
		} = req.body;
		const updateOrder = await Order.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateOrder);
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

const updateItemCooked = async (req, res) => {
	const { orderId, itemId } = req.params;
	const { cookedAt } = req.body;
	try {
		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).send('Order not found');
		}
		const item = order.items.id(itemId);
		if (!item) {
			return res.status(404).send('Item not found');
		}
		item.cookedAt = cookedAt;
		await order.save();
		res.send(order);
	} catch (error) {
		res.status(500).send('Server error');
	}
};

const updateOrderOpen = async (req, res) => {
	console.log(req.body);
	try {
		const { closeTime, orderOpen, filteredOrder, elapsedDuration } = req.body;
		console.log(closeTime, elapsedDuration);
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
		res.status(500).send('Error al actualizar el estado de las órdenes');
	}
};

const updateCashOrder = async (req, res) => {
	console.log('updateCashOrder', req.body);

	const { id } = req.params;
	const { orderCash, additionalCharges, validFinalPrice } = req.body;

	try {
		const order = await Order.findById(id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}

		order.orderCash = orderCash;
		order.additionalCharges = additionalCharges;
		order.finalPrice = validFinalPrice;

		await order.save();

		res.status(200).json({ message: 'Order updated successfully', order });
	} catch (error) {
		console.error('Error updating order:', error);
		res.status(500).json({ message: 'Error updating order' });
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
	updateOrder,
	updateOrderPending,
	updateItemCooked,
	updateOrderOpen,
	updateCashOrder,
	deleteOrder,
	deleteItem,
};
