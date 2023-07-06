const { Product } = require('../db/models');
// 작업 중
const ProductService = {

  // 전체 상품 조회 => 재고가 없으면 품절 띄우기
  getAllProducts: async () => {
    return await this.Product.findAll();
  },

  // bestProduct => 재고가 없으면 품절 띄우기
  getBestProducts: async () => {
    return await this.Product.find();
  },
  
  // 카테고리별 제품 조회 => 재고가 없으면 품절 띄우기
  getProductsByCategory: async () => {
    return await this.Product.find()
  },

  // 상품 상세 조회 => 재고가 없으면 품절 띄우기
  getProductById: async () => {
    return await this.Product.findById();
  },
}

module.exports = ProductService;