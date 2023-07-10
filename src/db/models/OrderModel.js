const mongoose = require('mongoose');
const { OrderSchema } = require('../schemas');

const Order = mongoose.model('UserOrder', OrderSchema);

module.exports = Order;
