const Order = require('../db/models/OrderModel');
const User = require('../db/models/UserModel');
const Product = require('../db/models/ProductModel');

const OrderService = {
	// [회원 비회원 공통] 장바구니 제품 주문 완료
	createOrder: async (
		email,
		purchase,
		recipient,
		phone,
		password,
		address,
		detailAddress,
		shippingRequest,
		shippingPrice
	) => {
		const totalProductsPrice = purchase.reduce((acc, product) => {
			return acc + product.price * product.orderAmount;
		}, 0);

		const orderInformation = {
			purchase,
			email,
			password,
			addressInformation: {
				recipient,
				phone,
				address,
				detailAddress,
				shippingRequest,
			},
			totalPrice: {
				totalProductsPrice: totalProductsPrice,
				shippingPrice: shippingPrice,
			},
		};

		const newOrderId = await Order.create(orderInformation);

		// salesAmount, currentAmount Update
		purchase.map(async product => {
			await Product.updateOne(
				{ _id: product.productId },
				{
					$inc: {
						salesAmount: product.orderAmount,
						currentAmount: -product.orderAmount,
					},
				}
			);
		});

		return newOrderId;
	},

	// [회원] 배송지 확인
	checkAddress: async email => {
		const address = await User.find(
			{ email: email },
			{ _id: 0, addressInformation: 1 }
		);

		return address;
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async email => {
		const orderHistory = await Order.find(
			{ email: email },
			{ _id: 1, shippingStatus: 1, purchase: 1, createdAt: 1 }
		);

		return orderHistory;
	},

	// [회원] 주문 상세 조회
	checkOrderDetail: async orderId => {
		const orderDetails = await Order.findOne(
			{ _id: orderId },
			{ _id: 1, password: 0 }
		);

		return orderDetails;
	},

	// [비회원] 주문 상세 조회
	guestCheckOrderDetail: async (orderId, password) => {
		const orderDetails = await Order.findOne(
			{ _id: orderId, password: password },
			{ _id: 1, password: 1 }
		);
		return orderDetails;
	},

	// [회원] 주문 시 배송지 추가
	addAddress: async (email, addressInformation) => {
		await User.updateOne(
			{ email: email },
			{ addressInformation: addressInformation }
		);
	},
};

module.exports = OrderService;
