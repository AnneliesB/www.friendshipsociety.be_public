var express = require('express');
var router = express.Router();

const UserController = require('./controllers/user');
const UserMiddleware = require('./middleware/user');
const ParamsMiddleware = require('../shared/middleware/params');

router.post('/signup', UserMiddleware.validateSignup, UserMiddleware.validateEmail, UserController.createUser);
router.post('/login', UserMiddleware.validateLogin, UserController.authLogin);
router.post('/logout', UserController.authLogout);

router.get('/me', UserMiddleware.userExists, UserController.getUserInfo)

router.put('/password/update', UserMiddleware.userExists, UserMiddleware.validatePassword, UserController.updatePassword)
router.put('/profile/update', UserMiddleware.userExists, UserMiddleware.newEmailAvailable,UserController.updateProfile)

router.post('/welcome', UserController.welcomeEmail)
router.post('/request-password-reset', UserController.requestPasswordReset)
router.post('/reset-password', UserController.passwordReset)

module.exports = router;