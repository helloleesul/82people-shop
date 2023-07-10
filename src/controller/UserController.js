const { User } = require('../db/models');

const UserController = {
	updateUser: async (req, res, next) => {
		//헤더에 토큰값 체크
		const { email, password, address } = await req.body; //address:Object[] = required:false

		try {
			await User.updateOne({ email }, { password, address });
		} catch (err) {
			next(err);
		}

		return res.status(200).json({
			message: '회원 정보 수정 성공',
		});
	},

	deleteUser: async (req, res, next) => {
		//헤더에 토큰값 체크
		const { email } = await req.body; //필수 : validation check
		try {
			await User.updateOne({ email }, { deletedAt: true });
		} catch (err) {
			next(err);
		}
		return res.status(200).json({
			message: '회원 탈퇴 성공',
		});
	},

	userSignup: async (req, res, next) => {
		const { email, name, password } = await req.body; //필수 : 이메일 중복체크, address=required:false

		try {
			await User.create({
				email,
				name,
				password,
			});
		} catch (err) {
			next(err);
		}

		return res.status(201).json({
			msg: '가입 완료',
		});
	},

	getUserInformation: async (req, res, next) => {
		//헤더에 토큰값 체크
		try {
			// await User.findOne()
		} catch (err) {
			next(err);
		}
		return res.status(200).json({
			msg: '회원 정보 조회 완료',
			userInformation: { user: 'user' },
		});
	},
};

module.exports = { UserController };
