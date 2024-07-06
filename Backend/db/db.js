const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('MongoDB conectado desde Atlas');
	} catch (error) {
		console.error(error);
	}
};
module.exports = connectDB;
