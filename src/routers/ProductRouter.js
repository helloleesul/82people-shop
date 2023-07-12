const express = require('express');
const ProductController = require('../controller/ProductController');

const ProductRouter = express.Router();

// [사용자] 전체 상품 조회
ProductRouter.get('/products', ProductController.getAllProducts);

// [사용자] 카테고리별 상품 조회
ProductRouter.get(
	'/products/category/:category',
	ProductController.getProductsByCategory
);

// [사용자] 상품 상세 조회
ProductRouter.get('/products/:productId', ProductController.getProductById);

module.exports = ProductRouter;
