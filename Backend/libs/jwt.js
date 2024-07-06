const jwt = require('jsonwebtoken');

// crea token de usuario
function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.TOKEN_SECRET,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
}
module.exports = createAccessToken;
