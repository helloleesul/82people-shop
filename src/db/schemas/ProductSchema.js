const { Schema } = require('mongoose');

const ProductSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	manufacturer: {
		type: String,
		required: true,
	},
	imageURL: [String],
	currentAmount: {
		type: Number,
		required: true,
	},
	salesAmount: {
		type: Number,
		default: 0,
	},
});

module.exports = ProductSchema;