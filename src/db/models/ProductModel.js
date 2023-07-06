const mongoose = require('mongoose');
const { ProductSchema } = require('../schemas');

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
