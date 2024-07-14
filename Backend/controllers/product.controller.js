const Product = require('../models/product.model.js');

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createProduct = async (req, res) => {
	const { name, cant, cost, unit, supplier, status } = req.body;
	try {
		const newProduct = new Product({
			name,
			cant,
			cost,
			unit,
			supplier,
			status,
		});
		const savedProduct = await newProduct.save();
		res.json(savedProduct);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const { name, cant, cost, unit, supplier, status } = req.body;
		const updateProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateProduct);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		res.json(deletedProduct);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
