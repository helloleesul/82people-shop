const { OrderService } = require('../services');

const OrderController = {
	// [회원 || 비회원] 장바구니 제품 주문 완료
	createOrder: async (req, res, next) => {
		//헤더에 토큰 값 체크
		const { purchase, addressInformation, password } = await req.body;

		try {
			const createdOrderId = await OrderService.createOrder({
				purchase,
				addressInformation,
				password,
			});

			res.status(201).json({
				message: '주문 성공',
				createdOrderId,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원] 주문 시 배송지 확인 => 토큰 관련 미들웨어 작성 후 작업
	checkAddress: async (req, res, next) => {
		//헤더에 토큰 값 체크
		try {
			const address = await OrderService.checkAddress(); // 나중에

			res.status(200).json({
				message: '배송지 조회 성공',
				address,
			});
		} catch (err) {
			next(err);
		}
	},

	/*
    // [회원] 주문 시 배송지 추가 => 2주차에 작업
    addAddress: async (req, res, next) => {
        //헤더에 토큰 값 체크
        try {

            res.status(200).json({
                message: '배송지 추가 성공',
            });
        } catch(err) {
            next(err);
        };
    },
    */

	// [회원] 주문 내역 전체 조회 => 토큰 관련 미들웨어 작성 후 작업
	checkOrderHistory: async (req, res, next) => {
		//헤더에 토큰 값 체크
		try {
			const orderHistory = await OrderService.checkOrderHistory(); // 나중에

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
};

module.exports = { OrderController };
