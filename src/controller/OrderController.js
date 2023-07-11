const OrderService = require('../services/OrderService');

const OrderController = {
	// [회원 || 비회원] 장바구니 제품 주문 완료
	createOrder: async (req, res, next) => {
		const email = req.currentUserEmail;
		// const name = req.currentUserName;
		const { purchase, addressInformation, password } = req.body;

		try {
			const newOrderId = await OrderService.createOrder(email, {
				purchase,
				addressInformation,
				password,
			});

			res.status(201).json({
				message: '주문 성공',
				newOrderId,
				// name,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원] 주문 시 배송지 확인
	checkAddress: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const address = await OrderService.checkAddress(email);

			res.status(200).json({
				message: '배송지 조회 성공',
				address,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const orderHistory = await OrderService.checkOrderHistory(email);

			res.status(200).json({
				orderHistory,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원 || 비회원] 주문 상세 조회
	checkOrderDetail: async (req, res, next) => {
		const { orderId } = req.params;

		try {
			const orderDetail = await OrderService.checkOrderDetail(orderId);

			res.status(200).json({
				orderDetail,
			});
		} catch (err) {
			next(err);
		}
	},

	/*
    // [회원] 주문 시 배송지 추가 => 2주차에 작업
    addAddress: async (req, res, next) => {		
		const email = req.currentUserEmail;

        try {

            res.status(200).json({
                message: '배송지 추가 성공',
            });
        } catch(err) {
            next(err);
        };
    },
    */
};

module.exports = OrderController;
