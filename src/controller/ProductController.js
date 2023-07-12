const ProductService = require('../services/ProductService');
const { badRequestError } = require('../middleware/ErrorHandler');

const ProductController = {
	// 전체 상품 요청 및 응답
	getAllProducts: async (req, res, next) => {
		try {
			const [totalProducts, bestProducts] = await Promise.all([
				ProductService.getAllProducts(),
				ProductService.getBestProducts(),
			]);

			res.status(200).json({
				message: '전체 제품 목록 조회 성공',
				totalProducts: totalProducts,
				totalProducts: bestProducts
			});
		} catch (err) {
			next(err);
		}
	},

	// 카테고리별 상품 요청 및 응답
	getProductsByCategory: async (req, res, next) => {
		const { category } = req.query;

		try {
			const categoryProducts = await ProductService.getProductsByCategory(
				category
			);

			res.status(200).json({
				message: `${category} 카테고리 제품 조회 성공`,
				categoryProducts: categoryProducts
			});
		} catch (err) {
			next(err);
		}
	},

	getProductById: async (req, res, next) => {
		const { productId } = req.params;

		try {
			const product = await ProductService.getProductById(productId);

			if (!product) {
				throw new badRequestError(
					'상품이 존재하지 않습니다. 다시 한 번 확인해주세요.'
				);
			}

			res.status(200).json({
				message: '제품 상세 보기 조회 성공',
				productInfo: product,
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = ProductController;