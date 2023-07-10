const { User } = require('../db/models');

const UserService = {
	findUser: async email => {
		const findUser = await User.findOne({ email });

		return findUser;
	},

	updateUser: async (email, password, address) => {
		await User.updateOne({ email }, { password, address });
	},

	deleteUser: async email => {
		await User.updateOne({ email }, { isDeleted: true });
	},
};

module.exports = { UserService };
