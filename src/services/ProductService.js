const { Product } = require('../db');

class ProductService {
  constructor(Product) {
    this.Product = Product;
  };

  // 전체 상품 조회
  // bestProduct => ??
  async getProducts() {
    return await this.Product.findAll();
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

const productService = new ProductService(Product);

export { productService };
