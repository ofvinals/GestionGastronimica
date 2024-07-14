const Lounge = require('../models/lounge.model.js');

const getLounges = async (req, res) => {
	try {
		const lounges = await Lounge.find();
		res.json(lounges);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createLounge = async (req, res) => {
	const { name } = req.body;
	try {
		const newLounge = new Lounge({
			name,
		});
		const savedLounge = await newLounge.save();
		res.json(savedLounge);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getLounge = async (req, res) => {
	try {
		const lounge = await Lounge.findById(req.params.id);
		res.json(lounge);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateLayout = async (req, res) => {
	try {
		const { layouts } = req.body;
		const { id: salonId } = req.params;
		const salon = await Lounge.findById(salonId);
		salon.layouts = layouts;
		await salon.save();
		res.status(200).json(salon);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateTable = async (req, res) => {
	try {
		const { id } = req.params;
		const { isOpen, layoutId, closeTime, openAt } = req.body;
		const lounge = await Lounge.findById(id);
		const layout = lounge.layouts.id(layoutId);
		layout.isOpen = isOpen;
		layout.openAt = openAt;
		layout.closeTime = closeTime;
		await lounge.save();
		res.status(200).json(lounge);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateLounge = async (req, res) => {
	try {
		const { name } = req.body;
		const updateLounge = await Lounge.findByIdAndUpdate(
			req.params.id,
			{
				name,
			},
			{ new: true }
		);
		res.json(updateLounge);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteLounge = async (req, res) => {
	try {
		const deletedLounge = await Lounge.findByIdAndDelete(req.params.id);
		res.json(deletedLounge);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getLounge,
	getLounges,
	createLounge,
	updateLounge,
	updateLayout,
	deleteLounge,
	updateTable,
};
