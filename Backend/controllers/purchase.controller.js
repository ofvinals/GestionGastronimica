const Purchase = require('../models/purchase.model.js');
const { DateTime } = require('luxon');

const getPurchases = async (req, res) => {
	try {
		const purchases = await Purchase.find();
		res.json(purchases);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createPurchase = async (req, res) => {
	console.log(req.body);
	const { name, items, price, comment, status } = req.body;
	try {
		const ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires');
		const openAt = ahora.toISO();
		const newPurchase = new Purchase({
			name,
			items,
			price,
			comment,
			status,
			openAt,
		});
		const savedPurchase = await newPurchase.save();
		res.json(savedPurchase);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const getPurchase = async (req, res) => {
	try {
		const purchase = await Purchase.findById(req.params.id);
		res.json(purchase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updatePurchase = async (req, res) => {
	try {
		const { name, items, price, comment, status } = req.body;
		const updatePurchase = await Purchase.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updatePurchase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deletePurchase = async (req, res) => {
	try {
		const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
		res.json(deletedPurchase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getPurchase,
	getPurchases,
	createPurchase,
	updatePurchase,
	deletePurchase,
};
