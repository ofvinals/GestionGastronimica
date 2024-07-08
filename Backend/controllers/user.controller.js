const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	console.log(req.body)
	const { name, subname, email, dni, tel, address, rol, status, password } = req.body;

	try {
		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			subname,
			email, 
			dni,
			tel,
			address,
			rol,
			status,
			password: passwordHash,
		});
		const savedUser = await newUser.save();
		console.log(savedUser)
		res.json(savedUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user)
			return res.status(404).json({ message: 'Usuario no encontrado' });
		res.json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { name, subname,email, address, dni, tel, rol, status, password } = req.body;
		const updateFields = {
			name,
			subname,
			address,
			email, 
			dni,
			tel,
			rol,
			status,
			password,
		};
		const updateUser = await User.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{
				new: true,
			}
		);
		res.json(updateUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser)
			return res.status(404).json({ message: 'Usuario no encontrado' });
		res.json(deletedUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};
