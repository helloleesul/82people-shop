const User = require('../db/models/UserModel');

const UserService = {
	findUser: async email => {
		return await User.findOne({ email });
	},

	updateUser: async (email, password, address) => {
		await User.updateOne({ email }, { password, address });
	},

	deleteUser: async email => {
		if (!(await this.findUser(email))) {
			console.log('User not found');
		}
		await User.updateOne({ email }, { isDeleted: true });
	},
};

module.exports = UserService;
