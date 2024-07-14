const createAccessToken = require('../libs/jwt.js');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userFound = await User.findOne({ email });
		// VALIDACION DE USUARIO Y CONTRASEÑA
		if (!userFound)
			return res.status(400).json({
				message: ['El mail y/o contraseña son incorrectos'],
			});
		// COMPARA CONTRASEÑA ENCRIPTADA
		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch)
			return res.status(400).json({
				message: ['El mail y/o contraseña son incorrectos'],
			});
		// GENERA TOKEN CON DATOS DEL USUARIO
		const token = await createAccessToken({
			id: userFound._id,
			displayName: `${userFound.name} ${userFound.subname}`,
			email: userFound.email,
			rol: userFound.rol,
			status: userFound.status,
		});
		// DEVUELVE TOKEN Y ENVIA RESPUESTA AL FRONT
		res.cookie('token', token);
		return res.status(200).json({
			id: userFound._id,
			displayName: `${userFound.name} ${userFound.subname}`,
			accessToken: token,
			rol: userFound.rol,
			status: userFound.status,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(['Error de Ingreso']);
	}
};

// FUNCION DE LOGOUT
const logout = (req, res) => {
	// BORRA TOKEN
	res.cookie('token', '', { expires: new Date(0) });
	return res.sendStatus(200);
};

const profile = async (req, res) => {
	const userFound = await User.findById(req.user.id);
	if (!userFound) return res.status(400).json(['Usuario no encontrado']);
	return res.json({
		id: userFound._id,
		email: userFound.email,
		createdAt: userFound.createdAt,
	});
};

// VERIFICA AUTENTICIDAD Y VIGENCIA DEL TOKEN
const verifyToken = async (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'No existe token' });

	jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
		if (error)
			return res.status(401).json({ message: 'Token no autorizado' });
		try {
			const userFound = await User.findById(decoded.id);
			if (!userFound)
				return res.status(404).json({ message: 'Usuario no existe' });
			// DEVUELVE DATOS DEL USUARIO SI TOKEN ES VALIDO
			return res.status(200).json({
				id: userFound._id,
				email: userFound.email,
				displayName: `${userFound.name} ${userFound.subname}`,
				token: token,
				rol: userFound.rol,
				status: userFound.status,
			});
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Error interno de servidor', error: err.message });
		}
	});
};

module.exports = {
	login,
	logout,
	profile,
	verifyToken,
};
