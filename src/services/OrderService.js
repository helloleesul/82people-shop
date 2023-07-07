const { Order, User } = require('../db/models');

const OrderService = {
    // [회원 비회원 공통] 장바구니 제품 주문 완료
    createOrder: async ({ purchase, addressInformation, password }) => {
        if(!purchase || !addressInformation) {
            throw new Error('누락된 정보가 있습니다. 다시 한 번 확인해주세요.');
        };

        // 총 상품 가격 계산
        const totalProductsPrice = purchase.reduce((acc, purchase) => { 
            return acc + purchase.price * purchase.orderAmount;
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
        
        const createdOrder = await Order.create(orderInformation);
        
        return await Order.findById(createdOrder)
    },

    // [회원] 배송지 확인 => 토큰 관련 미들웨어 생성 후 작업
    checkAddress: async () => {
        const address = await User.find({}, {}) // 토큰에 담긴 유저 정보 기준으로 addressInformation 검색
        if(!address) {
            throw new Error('배송지가 존재하지 않습니다.');
        };

        return address;
    },
    
    /* 2주차에 작업
    // [회원] 주문 시 배송지 추가
    addAddress: async (userId) => {
        await User.create({
          // 
        })
    }, */
            
    // [회원] 주문 내역 전체 조회  => 토큰 관련 미들웨어 생성 후 작업
    checkOrderHistory: async () => {        
        orderHistory = await Order.find({ }); // 토큰에 담긴 유저 정보 기준으로 검색

        return orderHistory;
    },
    
    // [회원 비회원 공통] 주문 상세 조회
    checkOrderDetail: async (orderId) => {               
        const orderDetails = Order.findById(orderId);
        if (!orderDetails) {
            throw new Error('주문 내역이 존재하지 않습니다. 다시 한 번 확인해주세요.');
        };

        return orderDetails;
    },
}

  
module.exports = OrderService;
