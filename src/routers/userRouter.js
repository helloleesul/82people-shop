const { Router } = require('express');
const { UserController } = require('../controller');

const UserRouter = Router();

UserRouter.patch('/users', UserController.updateUser);
UserRouter.delete('/users', UserController.deleteUser);
UserRouter.post('/users/signUp', UserController.userSignup);
UserRouter.get('/users/myPage', UserController.getUserInformation);

module.exports = UserRouter;
