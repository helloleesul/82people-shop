const { Schema } = require('mongoose');

const OrderSchema = new Schema({
    orderId: Schema.Types.ObjectId,
    purchase: [{        
        productId: { type: Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        orderAmount: { type: Number, required: true },
        imageURL: { type: [String], required: true }
    }],
    password: {
        type: String,
        required: false,
    },
    addressInformation: {                
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    totalPrice: {
        totalProductsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true, default: 0 }
    }}, {
        timestamps: true,
    }
);

module.exports = OrderSchema;