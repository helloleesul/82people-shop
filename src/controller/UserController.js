const { User } = require('../db/models');

const UserController = {
	userValidation: async (req, res, next) => {
		try {
		} catch (err) {
			next(err);
		}
	},
};

module.exports = UserController;
