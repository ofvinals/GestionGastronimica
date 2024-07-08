const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	category: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: String, required: true },
	quantity: { type: Number, required: true },
	text: { type: String },
	pending: { type: Boolean },
});

const orderSchema = new Schema(
	{
		salonName: { type: String },
		tableNum: { type: Number },
		tableId: { type: String },
		diners: { type: Number },
		server: { type: String },
		orderOpen: { type: Boolean },
		openAt: { type: Date },
		closeTime: { type: Date },
		items: [itemSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
