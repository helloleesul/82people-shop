const { ProductService } = require('../services');

const ProductController = {
    // 전체 상품 요청 및 응답    
    getAllProducts: async (req, res, next) => {
        try {
            const totalProducts = await ProductService.getAllProducts();
            const bestProducts = await ProductService.getBestProducts();
            
            res.status(200).json({
                msg: '전체 제품 목록 조회 성공',
                totalProducts,
                bestProducts
            });
        } catch(err) {
            next(err);
        };
    },

    // 카테고리별 상품 요청 및 응답
    getProductsByCategory: async (req, res, next) => {
        const { category } = req.params;

        try {
            const categoryProducts = await ProductService.getProductsByCategory(category);

            res.status(200).json({
                msg: `${category} 카테고리 제품 조회 성공`,
                categoryProducts
            });
        } catch(err) {
            next(err);
        };
    },

    // 상품 id별 요청 및 응답
    getProductById: async (req, res, next) => {     
        const { productId } = req.params;   
        
        try {
            const product = await ProductService.getProductById(productId);

            res.status(200).json({
                msg: '제품 상세 보기 조회 성공',
                product
            });
        } catch(err) {
            next(err);
        };
    },
}

module.exports = ProductController;
