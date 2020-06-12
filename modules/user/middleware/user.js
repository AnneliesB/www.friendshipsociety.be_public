const bcrypt = require('bcryptjs');

const User = require('../models/user');
const errors = require('../../../config/errors')

const validateSignup = (req, res, next) => {
    const keys = ['firstname', 'lastname', 'nickname', 'email', 'password'];
    if (!keys.every(key => req.body.hasOwnProperty(key))) {
        return res.status(400).send(errors.BadRequestError);
    }

    return next()
}

const validateEmail = async (req, res, next) => {
    return await User
        .findOne({
            email: req.body.email
        })
        .exec()
        .then((user) => {
            if (user) {
                return res.status(409).send(errors.ConflictError);
            }

            return next()
        });
}

const validateLogin = (req, res, next) => {
    const keys = ['email', 'password'];
    if (!keys.every(key => req.body.hasOwnProperty(key))) {
        return res.status(400).send(errors.BadRequestError);
    }

    return next()
}

const validatePassword = async (req, res, next) => {
    return await User
        .findOne({
            _id: req.session.user._id,
        })
        .exec()
        .then((user) => {
            if (!user || !bcrypt.compareSync(req.body.currentPassword, user.password)) {
                return res.status(401).send(errors.UnauthorizedError);
            }
            return next();
        })
}

const userExists = async (req, res, next) => {
    return await User
        .findOne({
            _id: req.session.user._id,
        })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(404).send(errors.UserNotFoundError);
            }
            return next();
        })
}

const newEmailAvailable = async (req, res, next) => {
    return await User
        .findOne({
            email: req.body.email
        })
        .exec()
        .then((user) => {
            if (user && user._id != req.session.user._id) {
                return res.status(409).send(errors.ConflictError);
            }
            return next();
        })
}

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
module.exports.validateEmail = validateEmail;
module.exports.validatePassword = validatePassword;
module.exports.userExists = userExists;
module.exports.newEmailAvailable = newEmailAvailable;