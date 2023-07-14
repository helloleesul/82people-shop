const User = require('../db/models/UserModel');

const UserService = {
	findUser: async email => {
		return await User.findOne({ email });
	},

	updateUser: async (email, password) => {
		await User.updateOne({ email }, { password });
	},

	deleteUser: async email => {
		await User.updateOne({ email }, { isDeleted: true });
	},
};

module.exports = UserService;
