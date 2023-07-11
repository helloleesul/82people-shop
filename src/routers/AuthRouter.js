const express = require('express');
const AuthController = require('../controller/AuthController');

const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);

module.exports = AuthRouter;
