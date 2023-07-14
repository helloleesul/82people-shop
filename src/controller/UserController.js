const User = require('../db/models/UserModel');
const UserService = require('../services/UserService');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const UserController = {
	getUserInformation: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const findUser = await UserService.findUser(email);

			return res.status(200).json({
				msg: '회원 정보 조회 완료',
				userInformation: findUser,
			});
		} catch (err) {
			next(err);
		}
	},

	updateUser: async (req, res, next) => {
		const { email, password } = req.body;

		try {
			if (!email || !password) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			await UserService.updateUser(email, password);

			return res.status(200).json({
				message: '회원 정보 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	deleteUser: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			if (req.currentUserEmail !== email) {
				throw new conflictError('토큰의 정보와 값이 다릅니다.');
			}
			await UserService.deleteUser(email);

			return res.status(200).json({
				message: '회원 탈퇴 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	userSignup: async (req, res, next) => {
		const { email, name, password } = req.body;

		const isSignup = await UserService.findUser(email);

		try {
			if (isSignup !== null) {
				throw new conflictError('이미 가입 된 이메일 입니다.');
			}

			await User.create({
				email,
				name,
				password,
			});

			return res.status(201).json({
				msg: '가입 완료',
			});
		} catch (err) {
			next(err);
		}
	},

	emailOverlapCheck: async (req, res, next) => {
		const { email } = req.params;
		try {
			const searchedEmail = await UserService.findUser(email);

			if (searchedEmail) {
				throw new badRequestError('이미 가입된 이메일입니다.');
			}

			return res.status(200).json({
				msg: '사용 가능한 email입니다.',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = UserController;
