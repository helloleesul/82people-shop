const mongoose = require('mongoose');
const { OrderSchema } = require('../schemas/OrderSchema');

const Order = mongoose.model('UserOrder', OrderSchema);

module.exports = Order;