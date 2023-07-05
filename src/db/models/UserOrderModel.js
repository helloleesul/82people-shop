const mongoose = require('mongoose');
const { UserOrderSchema } = require('../schemas/UserOrderSchema');

const UserOrder = mongoose.model('UserOrder', UserOrderSchema);

module.exports = UserOrder;