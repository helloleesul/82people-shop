const { Order, User, Product } = require('../db/models');
const { badRequestError } = require('../middleware/ErrorHandler');

const OrderService = {
	// [회원 비회원 공통] 장바구니 제품 주문 완료
	createOrder: async (email, { purchase, addressInformation, password }) => {
		if (!email && !password) {
			throw new badRequestError('비회원은 비밀번호 입력이 필요합니다.');
		}
		if (!purchase || !addressInformation) {
			throw new badRequestError(
				'누락된 정보가 있습니다. 다시 한 번 확인해주세요.'
			);
		}

		// salseAmount Update
		Promise.all(
			purchase.map(async product => {
				await Product.updateOne(
					{ productId: product.productId },
					{ $inc: { salesAmount: product.orderAmount } }
				);
			})
		);

		// 총 상품 가격 계산
		const totalProductsPrice = purchase.reduce((acc, product) => {
			return acc + product.price * product.orderAmount;
		}, 0);

		const orderInformation = {
			purchase,
			addressInformation,
			password,
			totalPrice: {
				totalProductsPrice,
				shippingPrice,
			},
		};

		const newOrder = await Order.create(orderInformation);
		const newOrderId = await Order.findOne({ newOrder }).project({
			orderId: 1,
		});

		// 회원의 경우 회원 주문 내역에 저장
		if (email) {
			await User.updateOne(
				{ email: email },
				{ $push: { orderHistory: newOrderId } }
			);
		}

		return newOrderId;
	},

	// [회원] 배송지 확인
	checkAddress: async email => {
		const address = await User.findOne({ email: email }).project({
			addressInformation: 1,
		});
		if (!address) {
			throw new badRequestError('배송지가 존재하지 않습니다.');
		}

		return address;
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async email => {
		const orderIdArray = await User.findOne({ email: email }).project({
			orderHistory: 1,
		});

		const orderHistory = Promise.all(
			orderIdArray.map(async orderId => {
				await Order.findOne({ orderId: orderId }).project({
					orderId: 1,
					shippingStatus: 1,
					createdAt: 1,
					'purchase.productId': 1,
					'purchase.title': 1,
					'purchase.price': 1,
					'purchase.orderAmount': 1,
					'purchase.imageURL': { $slice: 1 },
				});
			})
		);

		return orderHistory;
	},

	// [회원 비회원 공통] 주문 상세 조회
	checkOrderDetail: async orderId => {
		const orderDetails = await Order.findById(orderId);
		if (!orderDetails) {
			throw new badRequestError(
				'주문 내역이 존재하지 않습니다. 다시 한 번 확인해주세요.'
			);
		}

		return orderDetails;
	},

	/* 2주차에 작업
    // [회원] 주문 시 배송지 추가
    addAddress: async (userId) => {
        await User.({
          // 
        })
    }, */
};

module.exports = { OrderService };
