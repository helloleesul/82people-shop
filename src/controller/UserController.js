const User = require('../db/models/UserModel');
const UserService = require('../services/UserService');

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
		const { email, password, address } = req.body; //address:Object[] = required:false

		try {
			if (!email || !password) {
				throw new Error('누락된 값이 있습니다.');
			}

			UserService.updateUser(email, password, address);

			return res.status(200).json({
				message: '회원 정보 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	deleteUser: async (req, res, next) => {
		const { email } = req.body;

		try {
			UserService.deleteUser(email);

			return res.status(200).json({
				message: '회원 탈퇴 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	userSignup: async (req, res, next) => {
		const { email, name, password } = req.body;

		const isSignup = await User.findOne({ email });

		try {
			if (!isSignup) {
				throw new Error('이미 가입 된 이메일 입니다.');
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
		const { email } = req.body;
		try {
			const searchedEmail = await UserService.findUser(email);

			if (searchedEmail) {
				return res.status(400).json({ msg: '이미 가입된 email입니다.' });
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
