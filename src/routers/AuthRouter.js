const express = require('express');
const AuthController = require('../controller/AuthController');

const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);
// AuthRouter.post('/login', async (req, res, next) => {
//     const { email, password } = req.body;
//     console.log('server', email);
//     console.log('ser', password);
//     try {
//         const searchedUser = await User.findOne({ email });

//         if (searchedUser.password !== password) {
//             return res.status(401).json({
//                 msg: '비밀번호가 일치하지 않습니다.',
//             });
//         }

//         if (!searchedUser) {
//             return res.status(400).json({
//                 msg: '존재하지 않는 유저입니다.',
//             });
//         }

//         const token = jwt.sign(
//             {
//                 email: searchedUser.email,
//                 name: searchedUser.name,
//             },
//             process.env.JSONSECRETKEY,
//             {
//                 expiresIn: '1h',
//             }
//         );

//         return res.status(200).json({ msg: '로그인 성공', Authorization: token });
//     } catch (err) {
//         next(err);
//     }});

module.exports = AuthRouter;
