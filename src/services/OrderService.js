const { Order, User } = require('../db/models');
// 작업 중
const OrderService = {
    // [회원 비회원 공통] 장바구니 제품 주문 완료
    createOrder: async (orderInfomation) => {
        return await Order.create(orderInfomation);
    },

    /*
    // [?] 주문 시 배송지 확인
    checkAddress: async (userId) => {
        const address = await User.find({
          // ??
        })
        return address;
    },
    
    // [?] 주문 시 배송지 추가
    addAddress: async (userId) => {
        await User.create({
          // ??
        })
    },
    */
    
    // [회원] 주문 내역 전체 조회
    checkOrderHistory: async (userId) => {
        const orders = await Order.find({ userId: userId }).select("orderId, title, imageURL, createdAt")

        return orders;
    },
    
    // [회원 비회원 공통] 주문 상세 조회
    checkOrderDetail: async (orderId) => {       
        return await Order.findById(orderId);
    },
}
  
module.exports = OrderService;
