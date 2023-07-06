const { Order, User } = require('../db/models');
// 작업 중
const OrderService = {
    // [회원 비회원 공통] 장바구니 제품 주문 완료
    createOrder: async (orderInfomation) => {
        // 주문 내역을 DB에 저장
        return await Order.create(orderInfomation);
    },

    /*
    // 주문 시 배송지 확인
        const address = await User.find({
          // ??
        })
        return address;
    },
    
    // 주문 시 배송지 추가
    addAddress: async (userId) => {
        await User.create({
          // ??
        })
    },
    */
    
    // [회원] 주문 내역 전체 조회 => 정렬 최신순?
    checkOrderHistory: async () => {
        // 회원 로그인 -> 마이페이지 -> 주문 내역(주문 했던 목록들)
        await Order.find({
            // userId: order 스키마의 orderDetails가 참조하는 유저의 id??? 
        })
        //return;
    },
    
    // [회원 비회원 공통] 주문 상세 조회
    checkOrderDetail: async (orderId) => {
        return await Order.findById(orderId);
    },
}
  
module.exports = OrderService;
