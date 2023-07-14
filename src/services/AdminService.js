const Order = require('../db/models/OrderModel');

const AdminService = {
    // [관리자] 전제 주문 목록 조회
	adminCheckOrders: async () => {
		return await Order.find({});
	},

    // [관리자] 주문 상세 내역 조회
	adminCheckOrderDetail: async orderId => {
		return await Order.findOne({ _id: orderId });
	},

    // [관리자] 주문 배송 상태 변경
	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne({ _id: orderId },{ shippingStatus: shippingStatus });
	},
};

module.exports = AdminService;