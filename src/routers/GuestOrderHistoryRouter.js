const { Router } = require('express');

const router = Router();

router.get('/orderHistory/:orderId', (req, res) => {
	const { orderId } = req.params;
});
