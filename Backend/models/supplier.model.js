const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		email: { type: String },
		tel: { type: String, require: true },
		address: { type: String, require: true },
		cuit: { type: String, require: true },
		comment: { type: String, require: true },
		status: { type: Boolean },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Supplier', supplierSchema);
