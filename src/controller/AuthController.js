const jwt = require('jsonwebtoken');

const { User } = require('../db/models');

const AuthController = {
	login: async (req, res, next) => {
		const { email, password } = await req.body;

		try {
			const searchedUser = await User.findOne({ email });

			if (searchedUser.password !== password) {
				return res.status(401).json({
					msg: '비밀번호가 일치하지 않습니다.',
				});
			}

			if (!searchedUser) {
				return res.status(400).json({
					msg: '존재하지 않는 유저입니다.',
				});
			}

			const token = jwt.sign(
				{
					email: searchedUser.email,
					name: searchedUser.name,
				},
				process.env.JSONSECRETKEY,
				{
					expiresIn: '1h',
				}
			);

			return res.status(200).json({ msg: '로그인 성공', Authorization: token });
		} catch (err) {
			next(err);
		}
	},

	// logout: async (req, res, next) => {
	//토큰값 체크
	// },
};
module.exports = { AuthController };
