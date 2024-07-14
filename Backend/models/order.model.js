const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	category: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: String, required: true },
	quantity: { type: Number, required: true },
	text: { type: String },
	pending: { type: Boolean },
	cookedAt: { type: String },
});

const orderSchema = new Schema(
	{
		salonName: { type: String, required: true },
		tableNum: { type: Number, required: true },
		tableId: { type: String, required: true },
		diners: { type: Number, required: true },
		server: { type: String, required: true },
		orderOpen: { type: Boolean, required: true },
		openAt: { type: Date, required: true },
		closeTime: { type: Date },
		elapsedDuration: [],
		orderCash: { type: String },
		finalPrice: { type: Number },
		additionalCharges: [],
		items: [itemSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
