const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
	const token = await req.header('Authorization');

	if (!token) {
		res.status(403).json({ msg: '로그인한 유저만 사용할 수 있습니다.' });
	}

	try {
		const verified = jwt.verify(token, process.env.JSONSECRETKEY);
		const currentUserEmail = verified.email;

		req.currentUserEmail = currentUserEmail;

		next();
	} catch (err) {
		res.status(403).json({ msg: '정상적인 토큰이 아닙니다.' });
	}
};

module.exports = VerifyToken;
