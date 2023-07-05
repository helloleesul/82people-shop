const { Router } = require('express');

const router = Router();

router.patch('/users', (req, res, next) => {
	const { email, name, password, address } = req.body; //address : required:false
});

router.delete('/users', (req, res, next) => {
	const { email, token } = req.body; //필수 : validation check
});

router.post('/users/signUp', (req, res, next) => {
	const { email, name, password, address } = req.body; //필수 : 중복체크
});

router.get('/users/myPage', (req, res, next) => {
	const { token } = req.body; //토큰으로 로그인 정보 검색(토큰 유효성도 동시에 체크)
});

router.get('/users/myPage/orderHistory', (req, res, next) => {
	const { token } = req.body; //토큰으로 로그인 정보 검색(토큰 유효성도 동시에 체크)
});

router.get('/users/myPage/orderHistory/details', (req, res, next) => {
	const { token } = req.body; //토큰으로 로그인 정보 검색(토큰 유효성도 동시에 체크)
});
