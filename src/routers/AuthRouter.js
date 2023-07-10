const { Router } = require('express');
const { AuthController } = require('../controller');

const AuthRouter = Router();

// AuthRouter.get('/login', AuthController.login);

// AuthRouter.put('/logout', async (req, res, next) => {
//header에 토큰값 받기
// });

module.exports = { AuthRouter };
