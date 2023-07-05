const { Schema } = require('mongoose');
const ProductSchema = require('./ProductSchema');

const UserOrderSchema = new Schema({
    orderId: Schema.Types.ObjectId,
    purchase: [ ProductSchema ],
    orderDetails: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }}, {
        timestamps: true,
    }
);

module.exports = UserOrderSchema;