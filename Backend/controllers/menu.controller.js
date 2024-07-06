const Menu = require('../models/menu.model.js');
const Category = require('../models/category.model.js');

const getMenus = async (req, res) => {
	try {
		const menus = await Menu.find();
		res.json(menus);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createMenu = async (req, res) => {
	const { name, category, description, price, status } = req.body;
	try {
		const newMenu = new Menu({
			name,
			category,
			description,
			price,
			status,
		});
		const savedMenu = await newMenu.save();
		res.json(savedMenu);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const getMenu = async (req, res) => {
	try {
		const menu = await Menu.findById(req.params.id);
		if (!menu)
			return res.status(404).json({ message: 'Proveedor no encontrado' });
		res.json(menu);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateMenu = async (req, res) => {
	try {
		const { name, category, description, price, status } = req.body;
		const updateMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updateMenu);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteMenu = async (req, res) => {
	try {
		const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
		if (!deletedMenu)
			return res.status(404).json({ message: 'Proveedor no encontrado' });
		res.json(deletedMenu);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getCategorys = async (req, res) => {
	try {
		const categorys = await Category.find();
		res.json(categorys);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createCategory = async (req, res) => {
	const { name, status } = req.body;
	try {
		const newCategory = new Category({
			name,
			status,
		});
		const savedCategory = await newCategory.save();
		res.json(savedCategory);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category)
			return res.status(404).json({ message: 'Categoria no encontrada' });
		res.json(category);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateCategory = async (req, res) => {
	try {
		const { name, status } = req.body;
		const updateCategory = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateCategory);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteCategory = async (req, res) => {
	try {
		const deletedCategory = await Category.findByIdAndDelete(req.params.id);
		if (!deletedCategory)
			return res.status(404).json({ message: 'Categoria no encontrada' });

		res.json(deletedCategory);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getMenu,
	getMenus,
	createMenu,
	updateMenu,
	deleteMenu,
	getCategory,
	getCategorys,
	createCategory,
	updateCategory,
	deleteCategory,
};
