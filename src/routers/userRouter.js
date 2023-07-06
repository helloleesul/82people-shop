const { Router } = require('express');

const UserRouter = Router();

UserRouter.patch('/users', async (req, res, next) => {
	//헤더에 토큰 값 체크
	const { email, name, password, address } = await req.body; //address:Object[] = required:false
});

UserRouter.delete('/users', async (req, res, next) => {
	//헤더에 토큰 값 체크
	const { email } = await req.body; //필수 : validation check
});

UserRouter.post('/users/signUp', async (req, res, next) => {
	const { email, name, password, address } = await req.body; //필수 : 이메일 중복체크, address=required:false
});

UserRouter.get('/users/myPage', async (req, res, next) => {
	//헤더에 토큰 값 체크
});

module.exports = UserRouter;
