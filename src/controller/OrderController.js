const { OrderService } = require('../services');

const OrderController = {
    // [회원 || 비회원] 장바구니 제품 주문 완료
    orderComplete: async (req, res, next) => {
        try {     
            const order = {
                password,
                purchase,
                address,
                recipient,
                phone,
                detailAddress,
                shippingRequest,
            } = await req.body; 
            
            await OrderService.orderComplete(order);

            res.status(200).json({
                msg: '주문 성공'
            });
        } catch(err) {
            next(err);
        };
    },

    // 주문 시 배송지 확인
    checkAddress: async (req, res, next) => {
        try {
            //헤더에 토큰값 체크
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
        try {
            //헤더에 토큰값 체크
            await OrderService.addAddress();

            const { recipient, phone, address, detailAddress, shippingRequest } = await req.body;
            //redirect('/')
            res.status(200).json({
                msg: '배송지 추가 성공'
            });
        } catch(err) {
            next(err);
        };
    },

    // [회원] 주문 내역 전체 조회
    checkOrderHistory: async (req, res, next) => {
        try {
            //헤더에 토큰값 체크
            //토큰속 아이디 값으로 주문정보 뿌려주기
            await OrderService.checkOrderHistory();

            res.status(200).json({
                msg: ''
            });
        } catch(err) {
            next(err);
        };
    },

    // [회원 || 비회원] 주문 상세 조회
    checkOrderDetail: async (req, res, next) => {	
        try {
            const { orderId } = req.params;
    
            await OrderService.orderComplete(orderId);
    
            res.status(200).json({
                msg: ''
            });
        } catch(err) {
            next(err);
        };
    },

}

module.exports = OrderController;