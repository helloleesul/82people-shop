const mongoose = require('mongoose');
const { GuestOrderSchema } = require('../schemas/GuestOrderSchema');

const GuestOrder = mongoose.model('UserOrder', GuestOrderSchema);

module.exports = GuestOrder;