const mongoose = require('mongoose');

const loungeSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		layouts: [
			{ x: Number, y: Number, id: Number, waiter: String, isOpen: Boolean, closeTime: String, OpenAt:String },
		],
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Lounge', loungeSchema);
