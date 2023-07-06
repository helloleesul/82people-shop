const { Schema } = require('mongoose');

const UserSchema = new Schema(
	{
		// _id 부분은 자동으로 Object.id를 넣어주기 때문에 생략
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
			recipient: { type: String, required: true },
			Phone: { type: String, required: true },
			address: { type: String, required: true },
			detailAddress: { type: String, required: true },
			shippingRequest: { type: String },
		},

		grade: {
			type: String,
			default: 1,
		},
		deletedAt: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = UserSchema;
