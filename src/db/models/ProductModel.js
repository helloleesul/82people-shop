const mongoose = require('mongoose');
const { ProductSchema } = require('../schemas/ProductSchema');

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;