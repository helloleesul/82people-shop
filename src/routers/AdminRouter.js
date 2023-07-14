const express = require('express');
const AdminController = require('../controller/AdminController');
const VerifyToken = require('../middleware/VerifyToken');

const AdminRouter = express.Router();

// [관리자] 전제 주문 목록 조회
AdminRouter.get('/admin', VerifyToken, AdminController.adminCheckOrders);

// [관리자] 주문 상세 내역 조회
AdminRouter.get('/admin/:orderId', VerifyToken, AdminController.adminCheckOrderDetail);

// [관리자] 주문 배송 상태 변경
AdminRouter.post('/admin/:orderId', VerifyToken, AdminController.updateShippingStatus);

module.exports = AdminRouter;
