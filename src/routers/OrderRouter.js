const { Router } = require('express');

const router = Router();

router.post('/order', (req, res) => {
	const {
		purchase,
		address,
		recipient,
		recipientNumber,
		detailAddress,
		shippingRequest,
	} = req.body; //purchase: string[]
});

router.get('/order', (req, res) => {
	const { token } = req.params;
});

router.post('/order/addAddress', (req, res) => {
	const {
		token,
		address,
		recipient,
		recipientNumber,
		detailAddress,
		shippingRequest,
	} = req.body;
});
