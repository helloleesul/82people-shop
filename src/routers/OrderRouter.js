const { Router } = require('express');
const { OrderController } = require('../controller');

const OrderRouter = Router();

OrderRouter.post('/orders', VerifyToken, OrderController.createOrder);

OrderRouter.get('/order/checkAddress', VerifyToken, OrderController.checkAddress);

OrderRouter.post('/order/addAddress', VerifyToken, OrderController.addAddress);

OrderRouter.get('orders/history', VerifyToken, OrderController.checkOrderHistory);

OrderRouter.get('orders/history:orderId', OrderController.checkOrderDetail);

module.exports = OrderRouter;
