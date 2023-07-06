const { OrderService } = require('../services');

const OrderController = {
    // [회원 || 비회원] 장바구니 제품 주문 완료
    createOrder: async (req, res, next) => {
        //헤더에 토큰 값 체크
        try {     
            const orderInfomation = {
                password,
                purchase,
                recipient,
                phone,
                address,
                detailAddress,
                shippingRequest,
            } = await req.body;
            // 주문한 상품 갯수 => ?? => 재고 - 산 상품 갯수

            await OrderService.createOrder(orderInfomation);

            res.status(201).json({
                msg: '주문 성공'
            });
        } catch(err) {
            next(err);
        };
    },

    /*
    // 주문 시 배송지 확인
    checkAddress: async (req, res, next) => {
        //헤더에 토큰 값 체크
        try {
            await OrderService.checkAddress();

            res.status(200).json({
                msg: '배송지 조회 성공'
            });
        } catch(err) {
            next(err);
        };
    },

    // 주문 시 배송지 추가
    addAddress: async (req, res, next) => {
        //헤더에 토큰 값 체크
        try {
            const addedAddress = await req.body;

            await OrderService.addAddress(addedAddress);

            res.status(200).json({
                msg: '배송지 추가 성공',
            });
        } catch(err) {
            next(err);
        };
    },
    */

    // [회원] 주문 내역 전체 조회
    checkOrderHistory: async (req, res, next) => {
        //헤더에 토큰 값 체크
        try {
            //토큰 속 아이디 값으로 주문정보 뿌려주기 ??
            //const userId = token._id =>?
            const orderHistory = await OrderService.checkOrderHistory(userId);
            
            res.status(200).json({
                orderHistory
            });
        } catch(err) {
            next(err);
        };
    },

    // [회원 || 비회원] 주문 상세 조회
    checkOrderDetail: async (req, res, next) => {	
        try {
            const { orderId } = req.params;
            
            const orderDatail = await OrderService.checkOrderDetail(orderId);
    
            res.status(200).json({
                orderDatail
            });
        } catch(err) {
            next(err);
        };
    },
}

module.exports = OrderController;