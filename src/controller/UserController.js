const { User } = require('../db/models');

const UserController = {
	getUserInformation: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const findUser = await User.findOne({ email });

			return res.status(200).json({
				msg: '회원 정보 조회 완료',
				userInformation: findUser,
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = { UserController };
