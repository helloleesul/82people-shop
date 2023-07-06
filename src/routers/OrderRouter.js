const { Router } = require('express');
const { OrderController }  = require('../controller');

const OrderRouter = Router();

// 토큰 값 체크는 middleware로 분리
OrderRouter.post('/orders', ,OrderController.orderComplete);  //헤더에 토큰 값 체크

OrderRouter.get('/order/checkAddress', ,OrderController.checkAddress);  //헤더에 토큰 값 체크

OrderRouter.post('/order/addAddress', ,OrderController.addAddress);  //헤더에 토큰 값 체크

OrderRouter.get('orders/history', ,OrderController.checkOrderHistory);  //헤더에 토큰 값 체크

OrderRouter.get('orders/history:orderId', OrderController.checkOrderDetail);

module.exports = OrderRouter;