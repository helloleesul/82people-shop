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
			recipient: { type: String, default: '' },
			phone: { type: String, default: '' },
			address: { type: String, default: '' },
			detailAddress: { type: String, default: '' },
			shippingRequest: { type: String, default: '' },
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
