const { Router } = require('express');
const { UserController } = require('../controller');
const VerifyToken = require('../middleware/VerifyToken');

const UserRouter = Router();

UserRouter.patch('/users', VerifyToken, UserController.updateUser);
UserRouter.delete('/users', VerifyToken, UserController.deleteUser);
UserRouter.get('/users/signUp', UserController.emailOverlapCheck);
UserRouter.post('/users/signUp', UserController.userSignup);
UserRouter.get('/users/myPage', VerifyToken, UserController.getUserInformation);

module.exports = { UserRouter };
