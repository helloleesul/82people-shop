const { Router } = require('express');
const { OrderController } = require('../controller');

const OrderRouter = Router();

// 토큰 값 체크는 middleware로 분리
OrderRouter.post('/orders', OrderController.createOrder);

OrderRouter.get('/order/checkAddress', OrderController.checkAddress);

OrderRouter.post('/order/addAddress', OrderController.addAddress);

OrderRouter.get('orders/history', OrderController.checkOrderHistory);

OrderRouter.get('orders/history:orderId', OrderController.checkOrderDetail);

module.exports = { OrderRouter };
