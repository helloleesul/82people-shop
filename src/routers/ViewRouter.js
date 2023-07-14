const express = require('express');
const ViewService = require('../services/ViewService');
const ViewRouter = express.Router();

//root
ViewRouter.use('/', ViewService.serveStatic('Home')); //메인화면

//product
ViewRouter.use('/products', ViewService.serveStatic('ProductDetails')); //제품 상세 보기
ViewRouter.use('/products/category', ViewService.serveStatic('Category')); //카테고리별 제품

//user
// ViewRouter.use('/users');
ViewRouter.use('/signup', ViewService.serveStatic('SignUp')); //회원가입 페이지
ViewRouter.use('/myPage', ViewService.serveStatic('MemberInfo')); //마이페이지
ViewRouter.use(
	'/myPage/delete-membership',
	ViewService.serveStatic('MemberDelete')
); //회원 탈퇴
ViewRouter.use('/myPage/orders', ViewService.serveStatic('OrderHistory')); // 회원 주문 조회 페이지
ViewRouter.use(
	'/myPage/orders/:history',
	ViewService.serveStatic('OrderDetail')
); // 주문 상세 조회 페이지

//order
ViewRouter.use('/cart', ViewService.serveStatic('Cart')); // 장바구니 페이지
ViewRouter.use('/orders', ViewService.serveStatic('Order')); // 주문 페이지
ViewRouter.use('/orders/complete', ViewService.serveStatic('OrderComplete')); //주 문 완료 페이지
ViewRouter.use('/guest/orders', ViewService.serveStatic('GuestOrder')); // 주문 상세 조회 페이지
ViewRouter.use(
	'/guest/orders/:history',
	ViewService.serveStatic('OrderDetail')
); // 주문 상세 조회 페이지

//auth
ViewRouter.use('/login', ViewService.serveStatic('Login')); //로그인 페이지

//common
ViewRouter.use('/common', ViewService.serveStatic('Common'));

//admin
ViewRouter.use('/admin', ViewService.serveStatic('Admin'));
ViewRouter.use('/admin/:orderId', ViewService.serveStatic('AdminOrderDetail'));

module.exports = ViewRouter;
