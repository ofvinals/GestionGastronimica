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
		if (!lounge)
			return res.status(404).json({ message: 'Producto no encontrado' });
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
		if (!salon) {
			return res.status(404).json({ error: 'Salón no encontrado' });
		}
		salon.layouts = layouts;
		await salon.save();
		console.log('salon actualizado', salon);
		res.status(200).json(salon);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el layout' });
	}
};

const updateTable = async (req, res) => {
	try {
		const { id } = req.params;
		const { isOpen, layoutId, closeTime, openAt } = req.body;
		const lounge = await Lounge.findById(id);
		const layout = lounge.layouts.id(layoutId);
		if (!layout) {
			return res.status(404).send('Layout no encontrado');
		}
		// Realizar la actualización
		layout.isOpen = isOpen;
		layout.openAt = openAt;
		layout.closeTime = closeTime;
		await lounge.save();
		res.status(200).send('Propiedad isOpen actualizada correctamente');
	} catch (error) {
		console.error('Error en el servidor:', error);
		res.status(500).send('Error al actualizar la propiedad isOpen');
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
		if (!deletedLounge)
			return res.status(404).json({ message: 'Producto no encontrado' });
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
