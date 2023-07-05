const { Schema } = require('mongoose');
const ProductSchema = require('./ProductSchema');

const GuestOrderSchema = new Schema({
    orderId: Schema.Types.ObjectId,
    purchase:[ ProductSchema ],
    orderDetails: {
            password : String, 
            address : {
                recipient: String,
                recipientNumber: String,
                address: String,
                detailAddress: String,
                shippingRequest: String,
            },
    }}, {
        timestamps: true,   
    }
);

module.exports = GuestOrderSchema;