const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
	name: { type: String },
});

const menuSchema = new mongoose.Schema(
	{
		category: { type: String, require: true },
		name: { type: String, require: true },
		description: { type: String, require: true },
		price: { type: String, require: true },
		status: { type: Boolean },
		ingredients: [ingredientSchema],
		recipe: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Menu', menuSchema);
