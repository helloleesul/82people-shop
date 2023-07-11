const Product = require('../db/models/ProductModel');
const { badRequestError } = require('../middleware/ErrorHandler');

const ProductService = {
	// [사용자] 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({});
	},

	// [사용자] 인기 상품 4개까지 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(4);
	},

	// [사용자] 카테고리별 제품 조회
	getProductsByCategory: async category => {
		if (!category) {
			throw new badRequestError(
				'해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해주세요.'
			);
		}

		return await Product.find({ category: category });
	},

	// [사용자] 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findById(productId);
		if (!product) {
			throw new badRequestError(
				'상품이 존재하지 않습니다. 다시 한 번 확인해주세요.'
			);
		}

		return product;
	},
};

module.exports = ProductService;
