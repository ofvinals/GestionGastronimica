const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	itemName: { type: String, required: true },
	quantity: { type: Number, required: true, min: 1 },
});

const purchaseSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		items: [ItemSchema],
		price: { type: Number, default: 0 },
		comment: { type: String },
		status: { type: Boolean, required: true },
		openAt: { type: Date },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Purchase', purchaseSchema);
