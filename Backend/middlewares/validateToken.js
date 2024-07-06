const jwt = require ('jsonwebtoken');

const authRequired = (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"]; 
		console.log(authHeader)

		const token = authHeader && authHeader.split(' ')[1]; 
		console.log(token)

		if (!token)
			return res.status(401).json(['Autorizacion rechazada. No tienes permiso']);

		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				return res.status(401).json(['El Token no es valido. Ingrese nuevamente']);
			}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
authRequired
};