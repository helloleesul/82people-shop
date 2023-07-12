const express = require('express');
const UserController = require('../controller/UserController');
const VerifyToken = require('../middleware/VerifyToken');

const UserRouter = express.Router();

UserRouter.patch('/users', VerifyToken, UserController.updateUser);
UserRouter.delete('/users', VerifyToken, UserController.deleteUser);
UserRouter.get('/users/signup/:email', UserController.emailOverlapCheck);
UserRouter.post('/users/signup', UserController.userSignup);
UserRouter.get('/users/myPage', VerifyToken, UserController.getUserInformation);

module.exports = UserRouter;
