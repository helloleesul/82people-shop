const { Schema } = require('mongoose');

const shippingStat = ['상품 준비 중', '배송 중', '배송 완료'];

const OrderSchema = new Schema({
    orderId: Schema.Types.ObjectId,
    shippingStatus: {
			type: String,
			enum: shippingStat,
			default: '상품 준비 중',
		},
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
