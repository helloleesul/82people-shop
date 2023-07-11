const express = require('express');
const ViewService = require('../services/ViewService');
const ViewRouter = express.Router();

//root
ViewRouter.use('/', ViewService.serveStatic('Home'));

//product
// ViewRouter.use('/products', ViewService.serveStatic()); // 메인 화면
// ViewRouter.use('/products/:productId'); //제품 상세 보기
// ViewRouter.use('/products/category'); //카테고리별 제품

//user
// ViewRouter.use('/users');
// ViewRouter.use('/users/signup', ViewService.serveStatic('SignUp')); //회원가입 페이지
// ViewRouter.use('/users/myPage'); //마이페이지

//auth
// ViewRouter.use('/login', ViewService.serveStatic('SignIn')); //로그인 페이지

//order
ViewRouter.use('/cart', ViewService.serveStatic('Cart')); // 장바구니 페이지
ViewRouter.use('/orders', ViewService.serveStatic('Order')); // 주문 페이지
ViewRouter.use('/orders/complete', ViewService.serveStatic('OrderComplete')); //주 문 완료 페이지
ViewRouter.use('/orders/history', ViewService.serveStatic('OrderHistory')); // 회원 주문 조회 페이지
ViewRouter.use('/orders/history/:orderId', ViewService.serveStatic('OrderDetail')); // 주문 상세 조회 페이지

module.exports = ViewRouter;
