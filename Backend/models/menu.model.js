const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
	{
		category: { type: String, require: true },
		name: { type: String, require: true },
		description: { type: String, require: true },
		price: { type: String, require: true },
		status: { type: Boolean },
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Menu', menuSchema);
