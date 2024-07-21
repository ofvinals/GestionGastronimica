const Supplier = require('../models/supplier.model.js');

const getSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.json(suppliers);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createSupplier = async (req, res) => {
	const { name, email, tel, address, cuit, comment, status } = req.body;
	try {
		const newSupplier = new Supplier({
			name,
			email,
			tel,
			address,
			cuit,
			comment,
			status,
		});
		const savedSupplier = await newSupplier.save();
		res.json(savedSupplier);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findById(req.params.id);
		res.json(supplier);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateSupplier = async (req, res) => {
	try {
		const { name, email, tel, address, cuit, comment, status } = req.body;
		const updateSupplier = await Supplier.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateSupplier);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteSupplier = async (req, res) => {
	try {
		const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
		res.json(deletedSupplier);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getSupplier,
	getSuppliers,
	createSupplier,
	updateSupplier,
	deleteSupplier,
};
