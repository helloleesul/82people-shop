const { Product } = require('../db/models');

const ProductService = {
	// [사용자] 전체 상품 조회
	getAllProducts: async () => {
		return await new Promise(Product.find({}));
	},

	// [사용자] 인기 상품 4개까지 조회
	getBestProducts: async () => {
		return await new Promise(Product.find({}).sort({ salesAmount: -1 }).limit(4));
	},

	// [사용자] 카테고리별 제품 조회
	getProductsByCategory: async category => {
		if (!category) {
			throw new Error(
				'해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해주세요.'
			);
		}

		return Product.find({ category: category });
	},

	// [사용자] 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findById(productId);
		if (!product) {
			throw new Error('상품이 존재하지 않습니다. 다시 한 번 확인해주세요.');
		}

		return product;
	},
};

module.exports = ProductService;
