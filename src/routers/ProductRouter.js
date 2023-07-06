const { Router } = require('express');

const router = Router();

router.get('/products', (req, res, next) => {
	res.json();
});

router.get('/products/:category', (req, res, next) => {
	const { category } = req.params;
	//Product.find({category})
});

router.get('/products/:productId', (req, res, next) => {
	const { productId } = req.params;
	//Product.find({productId})
});
