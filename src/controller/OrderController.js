const { productService } = require('../services');

class productController {
    // 전체 상품 요청 및 응답    
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
    async getProducts(req, res, next) {
        try {
            const totalProducts = await productService.getProducts();
            //const bestProducts = await productService.getBestProducts(); => ??

            res.status(200).json({
                msg: '아이템 리스트',
                totalProducts,
                //bestProducts,
            });
        } catch(err) {
            next(err);
        };
    };

    // 카테고리별 상품 요청 및 응답
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
    async getProductsByCategory() {
        try {
            const { category } = req.params;
            const categoryProducts = await productService.getProductsByCategory(category);

            res.status(200).json({
                msg: '아이템 리스트',
                categoryProducts,
            });
        } catch(err) {
            next(err);
        };
    };

    // 상품 Id별 요청 및 응답
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
    async getProductsById() {        
        try {
            const { productId } = req.params;
            const Product = await productService.getProductsById(productId);

            res.status(200).json({
                msg: '아이템 리스트',
                Product,
            });
        } catch(err) {
            next(err);
        };
    };
}

const productController = new productController();

export { productController };
