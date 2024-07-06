const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		cant: { type: String, require: true },
		cost: { type: String, require: true },
		unit: { type: String, require: true },
		supplier: { type: String, require: true },
		status: { type: Boolean },
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', productSchema);
