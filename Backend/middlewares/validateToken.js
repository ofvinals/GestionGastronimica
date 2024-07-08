const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		if (!authHeader) {
			return res
				.status(401)
				.json({ message: 'Authorization denied. No token provided.' });
		}
		const token = authHeader.split(' ')[1];
		if (!token) {
			return res
				.status(401)
				.json({ message: 'Authorization denied. Invalid token format.' });
		}

		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				return res
					.status(401)
					.json({ message: 'Invalid token. Please log in again.' });
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
