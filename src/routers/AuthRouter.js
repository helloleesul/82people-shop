const { Router } = require('express');

const AuthRouter = Router();

AuthRouter.get('/login', async (req, res, next) => {
	const { email, password } = await req.body;
});

AuthRouter.put('/logout', async (req, res, next) => {
	//header에 토큰값 받기
});

module.exports = AuthRouter;
