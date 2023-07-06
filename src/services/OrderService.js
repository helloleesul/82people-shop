const { Order } = require('../db/models');
// 작업 중
const OrderService = {
    // [회원 || 비회원] 장바구니 제품 주문 완료
    orderComplete: async () => {
    // 주문 내역을 DB에 저장
    // orderId, timstamps는 자동 생성
    // 구매품, 비밀번호(비회원만 값 존재), orderDetails(User->addressInformation)
    return;
  },

  // 주문 시 배송지 확인
  async checkAddress() {
    return;
  },
  
  // 주문 시 배송지 추가
  async addAddress() {
    return;
  },

  // [회원] 주문 내역 전체 조회
  async checkOrderHistory() {
    return;
  },

  // [회원 || 비회원] 주문 상세 조회
  async checkOrderDetail(orderId) {
    return;
  },
}

module.exports = OrderService;
