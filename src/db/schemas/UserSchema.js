const { Schema } = require('mongoose');

const userRole = ['customer', 'admin'];

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		addressInformation: {
			recipient: { type: String },
			phone: { type: String },
			address: { type: String },
			detailAddress: { type: String },
			shippingRequest: { type: String },
		},
		role: {
			type: String,
			enum: userRole,
			default: 'customer',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = UserSchema;
