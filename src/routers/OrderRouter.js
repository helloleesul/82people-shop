const express = require('express');
const OrderController = require('../controller/OrderController');
const VerifyToken = require('../middleware/VerifyToken');

const OrderRouter = express.Router();

// [회원] 주문
OrderRouter.post('/orders', VerifyToken, OrderController.createOrder);

// [비회원] 주문
OrderRouter.post('/orders/guest', OrderController.createOrder);

// [회원] 배송지 조회
OrderRouter.get(
	'/orders/checkAddress',
	VerifyToken,
	OrderController.checkAddress
);

// [회원] 배송지 추가(업데이트)
OrderRouter.post('/orders/addAddress', VerifyToken, OrderController.addAddress);

// [회원] 주문 내역 조회
OrderRouter.get(
	'/orders/history',
	VerifyToken,
	OrderController.checkOrderHistory
);

// [회원 || 비회원] 주문 상세 내역 조회
OrderRouter.post('/orders/history/:orderId', OrderController.checkOrderDetail);

module.exports = OrderRouter;
