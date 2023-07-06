const { Product } = require('../db/models');
// 작업 중
// 전체, 카테고리별 상품 정렬 어떻게 할건지
const ProductService = {
    // 전체 상품 조회
    getAllProducts: async () => {
        return await Product.find({});
    },

    // 인기 상품 4개까지 조회 
    getBestProducts: async () => {
        return await Product.find({}).sort({ salesAmount: 1 }).limit(4);;
    },
    
    // 카테고리별 제품 조회 
    getProductsByCategory: async (category) => {
        if (!category) {
          throw new Error('카테고리가 존재하지 않습니다. 다시 한 번 확인해주세요.');
        }

        return Product.find({ category: category })
    },

    // 상품 상세 조회 
    getProductById: async (productId) => {
        if (!productId) {
          throw new Error('상품이 존재하지 않습니다. 다시 한 번 확인해주세요.');
        }

        return await Product.findById(productId);
    },
}

module.exports = ProductService;