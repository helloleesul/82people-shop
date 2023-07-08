const { Router } = require('express');
const { UserController } = require('../controller');
const { UserService } = require('../services');
const VerifyToken = require('../middleware/VerifyToken');

const UserRouter = Router();

UserRouter.patch('/users', VerifyToken, UserService.updateUser);
UserRouter.delete('/users', VerifyToken, UserService.deleteUser);
UserRouter.post('/users/signUp', UserService.userSignup);
UserRouter.get('/users/myPage', VerifyToken, UserController.getUserInformation);

module.exports = UserRouter;
