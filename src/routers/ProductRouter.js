const { Router } = require('express');

const ProductRouter = Router();

ProductRouter.get('/products', async (req, res, next) => {
	// res.json();
});

ProductRouter.get('/products/:category', async (req, res, next) => {
	const { category } = await req.params;
	//Product.find({category})
});

ProductRouter.get('/products/:productId', async (req, res, next) => {
	const { productId } = await req.params;
	//Product.find({productId})
});

module.exports = ProductRouter;
