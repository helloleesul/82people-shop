const express = require('express');
const OrderController = require('../controller/OrderController');
const VerifyToken = require('../middleware/VerifyToken');

const OrderRouter = express.Router();

OrderRouter.post('/orders', VerifyToken, OrderController.createOrder);

OrderRouter.get(
	'/orders/checkAddress',
	VerifyToken,
	OrderController.checkAddress
);

// OrderRouter.post('/orders/addAddress', VerifyToken, OrderController.addAddress);

OrderRouter.get(
	'/orders/history',
	VerifyToken,
	OrderController.checkOrderHistory
);

OrderRouter.get('/orders/history:orderId', OrderController.checkOrderDetail);

module.exports = OrderRouter;
