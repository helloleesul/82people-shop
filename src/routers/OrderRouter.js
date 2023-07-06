const { Router } = require('express');

const OrderRouter = Router();

//토큰 값 체크는 중복값이기에 middleware로 분리

OrderRouter.post('/orders', async (req, res, next) => {
	//헤더에 토큰 값 체크
	const {
		password,
		purchase,
		address,
		recipient,
		phone,
		detailAddress,
		shippingRequest,
	} = await req.body; //purchase: string[]
	//토큰이 있다면 회원 , 토큰이 없고 비밀번호가 있으면 비회원
});

OrderRouter.get('/order/checkAddress', async (req, res, next) => {
	//헤더에 토큰값 체크
});

OrderRouter.post('/order/addAddress', async (req, res, next) => {
	//헤더에 토큰값 체크
	const { recipient, phone, address, detailAddress, shippingRequest } =
		await req.body;
	//redirect('/')
});

OrderRouter.get('orders/history', async (req, res, next) => {
	//헤더에 토큰값 체크
	//토큰속 아이디 값으로 주문정보 뿌려주기
});

OrderRouter.get('orders/history:orderId', async (req, res, next) => {
	const { orderId } = await req.params;
	//orderId로 검색해서 값 알려주기
});

module.exports = OrderRouter;
