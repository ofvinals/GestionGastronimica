const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		if (!authHeader) {
			return res
				.status(401)
				.json({ message: 'Autorizacion rechazada. No tiene Token para ingresar.' });
		}
		const token = authHeader.split(' ')[1];
		if (!token) {
			return res
				.status(401)
				.json({ message: 'Authorizacion rechazada. Token invalido.' });
		}

		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				return res
					.status(401)
					.json({ message: 'Token Invalido. Por favor, logueate nuevamente.' });
			}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	authRequired,
};
