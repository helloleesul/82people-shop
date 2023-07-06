const { OrderService } = require('../services');

class OrderController {
    async getProducts(req, res, next) {
        try {
            const  = await OrderService.();
            
            res.status(200).json({
                msg: '아이템 리스트',
            });
        } catch(err) {
            next(err);
        };
    };

    async getProductsByCategory() {
        try {
            const { category } = req.params;
            const categoryProducts = await OrderService.getProductsByCategory(category);

            res.status(200).json({
                msg: '아이템 리스트',
                categoryProducts,
            });
        } catch(err) {
            next(err);
        };
    };
    
    async getProductsById() {        
        try {
            const { productId } = req.params;
            const Product = await OrderService.getProductsById(productId);

            res.status(200).json({
                msg: '아이템 리스트',
                Product,
            });
        } catch(err) {
            next(err);
        };
    };
}

const OrderController = new OrderController();

export { OrderController };
