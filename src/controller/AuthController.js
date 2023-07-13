const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const AuthController = {
	login: async (req, res, next) => {
		const { email, password } = req.body;
		console.log('body', req.body);
		console.log('server', email);
		console.log('ser', password);
		try {
			const searchedUser = await UserService.findUser(email);

			if (searchedUser === null) {
				throw new badRequestError('존재하지 않는 아이디입니다.');
			}

			if (searchedUser.isDeleted) {
				throw new badRequestError('탈퇴한 아이디입니다.');
			}

			if (searchedUser.password !== password) {
				throw new conflictError('비밀번호가 일치하지 않습니다.');
			}

			const token = jwt.sign(
				{
					email: searchedUser.email,
					name: searchedUser.name,
					role: searchedUser.role,
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
};
module.exports = AuthController;
