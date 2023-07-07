const { Schema } = require('mongoose');
const ProductSchema = require('./ProductSchema');

const shippingStat = ['상품 준비 중', '배송 중', '배송 완료'];

const OrderSchema = new Schema(
	{
		orderId: Schema.Types.ObjectId,
		shippingStatus: {
			type: String,
			enum: shippingStat,
			default: '상품 준비 중',
		},
		purchase: [ProductSchema],
		password: {
			type: String,
			required: false,
		},
		orderDetails: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = OrderSchema;
