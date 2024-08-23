const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
	{
		date: { type: String, require: true },
		price: { type: String, require: true },
		formPay: { type: String, require: true },
		supplier: { type: String },
		receiptNum: { type: String, require: true },
		receiptType: { type: String, require: true },
		status: { type: Boolean },
		comments: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Bill', billSchema);
