const { Product } = require('../db');

class ProductService {
  constructor(Product) {
    this.Product = Product;
  };

  // 전체 상품 조회
  async getAllProducts() {
    return await this.Product.findAll();
  };

  // bestProduct => 판매량 최상위 4개
  async getBestProducts() {
    return await this.Product.find();
  };
  
  // 카테고리별 제품 조회
  async getProductsByCategory() {
    return await this.Product.find()
  };

  // 상품 상세 조회
  async getProductById() {
    return await this.Product.findById();
  };
}

const ProductService = new ProductService(Product);

module.exports = ProductService;

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
