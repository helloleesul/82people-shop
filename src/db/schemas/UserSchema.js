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
		addressInformation: [
			{
				recipient: { type: String, required: true },
				phone: { type: String, required: true },
				address: { type: String, required: true },
				detailAddress: { type: String, required: true },
				shippingRequest: { type: String },
			},
		],

		role: {
			type: String,
			enum: userRole,
			default: 'customer',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		orderHistory: [Schema.Types.ObjectId],
	},
	{
		timestamps: true,
	}
);

module.exports = UserSchema;