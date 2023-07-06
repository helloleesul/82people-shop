const { Schema } = require('mongoose');
const ProductSchema = require('./ProductSchema');

const OrderSchema = new Schema({
    orderId: Schema.Types.ObjectId,
    purchase: [ ProductSchema ],
    password: {
        type: String,
        required: false,
    },
    orderDetails: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }}, {
        timestamps: true,
    }
);

module.exports = OrderSchema;