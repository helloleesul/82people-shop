const { productService } = require('../services');

class productController {
      
    // 전체 상품 요청 및 응답    
    async getProducts(req, res, next) {
        try {
            const totalProducts = await productService.getProducts();
            // const bestProducts = 

            res.status(200).json({
                msg: '전체 제품 목록 조회 성공',
                totalProducts,
                // bestProducts => ??
            });
        } catch(err) {
            next(err);
        };
    };

    // 카테고리별 상품 요청 및 응답
    async getProductsByCategory() {
        try {
            const { category } = req.params;
            const categoryProducts = await productService.getProductsByCategory(category);

            res.status(200).json({
                msg: `${category} 카테고리 제품 조회 성공`,
                categoryProducts
            });
        } catch(err) {
            next(err);
        };
    };

    // 상품 Id별 요청 및 응답
    async getProductsById() {        
        try {
            const { productId } = req.params;
            const product = await productService.getProductsById(productId);

            res.status(200).json({
                msg: '제품 상세 보기 조회 성공',
                product
            });
        } catch(err) {
            next(err);
        };
    };
}

const productController = new productController();

export { productController };











    /* totalProducts:
                    {[
                        _id:,
                        title:,
                        price:,
                        manufacturer:,
                        imageUrl:,
                        category:,
                        amout
                    ]} */
    // path: /products  


        /* categoryProducts:
                    {[
                        _id:,
                        title:,
                        price:,
                        manufacturer:,
                        imageUrl:,
                        category:,
                        amout
                    ]} */
    //path: /products/:category



    /* product{[
                _id:,
                title:,
                price:,
                manufacturer:,
                imageUrl:,
                category:,
                description,
                amount
            ]} */
    //path: /products/:productId