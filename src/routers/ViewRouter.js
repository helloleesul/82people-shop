const express = require('express');

const ViewRouter = express.Router();

//root
ViewRouter.use('/');

//product
ViewRouter.use(
	'/products',
	express.static('../views/Home', { index: 'Home.html' })
); // 메인 화면
ViewRouter.use('/products/:productId'); //제품 상세 보기
ViewRouter.use('/products/category'); //카테고리별 제품

//user
// ViewRouter.use('/users');
ViewRouter.use(
	'/users/signup',
	express.static('../views/SignUp', { index: 'SignUp.html' })
); //회원가입 페이지
ViewRouter.use('/users/myPage'); //마이페이지

//auth
ViewRouter.use(
	'/login',
	express.static('../views/SignIn', { index: 'SignIn.html' })
); //로그인 페이지

//order
ViewRouter.use('/orders'); //주문 완료 페이지
ViewRouter.use('/orders/history'); //회원 주문 조회 페이지
ViewRouter.use('/orders/history/:orderId'); //주문 상세 조회 페이지

module.exports = ViewRouter;
