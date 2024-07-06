const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		subname: { type: String, required: true },
		address: { type: String },
		dni: { type: String, required: true },
		tel: { type: String, required: true },
		rol: { type: String, required: true },
		status: { type: Boolean },
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('User', userSchema);
