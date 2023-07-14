const Product = require('../db/models/ProductModel');

const ProductService = {
	// [사용자] 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({});
	},

	//[사용자] 인기 상품 4개까지 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(4);
	},

	// [사용자] 카테고리별 제품 조회
	getProductsByCategory: async category => {
		return await Product.find({ category: category });
	},

	// [사용자] 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findOne({ _id: productId });

		return product;
	},
};

module.exports = ProductService;