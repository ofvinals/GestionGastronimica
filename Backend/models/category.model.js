const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		status: { type: Boolean },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Category', categorySchema);
