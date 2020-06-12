const bcrypt = require('bcryptjs');

const User = require('../models/user');
const PasswordReset = require('../models/passwordReset');
const errors = require('../../../config/errors')
const EmailService = require('../services/email');
const Questionaire = require('../../questionaire/models/questionaire');

const createUser = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

    return await User
        .create({
            ...req.body
        })
        .then(async (user) => {
            await Questionaire
                .create({
                    owner: user._id,
                    items: [
                        'Wat is je naam?',
                        'Welke boodschap wil je meegeven?',
                        'Van waar kennen wij elkaar en hoe lang?',
                        'Wanneer ben je jarig?',
                        'Wat zijn je hobbies?',
                        'Wat is je mooiste herinnering van ons samen?'
                    ],
                    initial: true,
                })

            req.session.user = user;
            req.session.save(() => {
                welcomeEmail(user._id, user.email, user.firstname)
                return res.status(200).json({
                    code: 200,
                    data: user
                });
            });
        })
        .catch(next);
}

const authLogin = async (req, res, next) => {
    delete req.session.user;

    return User
        .findOne({
            email: req.body.email,
        })
        .exec()
        .then((user) => {
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).send(errors.UnauthorizedError);
            }

            req.session.user = user;
            req.session.save(() => {
                return res.status(200).json({
                    code: 200,
                    data: user
                });
            });
        })
}

const getUserInfo = async (req, res, next) => {
    return User
        .findOne({
            _id: req.session.user._id,
        })
        .exec()
        .then((user) => {
            return res.status(200).json({
                code: 200,
                data: user
            });
        })
}

const updatePassword = async (req, res, next) => {
    const password = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync());

    return await User
        .findOneAndUpdate({
            _id: req.session.user._id
        }, {
            password: password,
        })
        .then((user) => {
            return res.status(200).json({
                code: 200,
                data: user
            });
        })
        .catch(next);
}

const updateProfile = async (req, res, next) => {
    await User
        .findOneAndUpdate({
            _id: req.session.user._id
        }, {
            ...req.body,
        })
        .catch(next);

    return await User
        .findOne({
            _id: req.session.user._id
        })
        .then((user) => {
            return res.status(200).json({
                code: 200,
                data: user
            });
        })
        .catch(next);
}

const authLogout = (req, res, next) => {
    delete req.session.user;
    req.session.destroy();
    return res.redirect('/login')
}

const welcomeEmail = (_id, email, name) => {
    // create mjml
    const data = {
        template: 'welcome',
        subject: 'Welkom bij Friendship Society!',
        user: {
            _id: _id,
            name: name
        }
    }
    return EmailService.sendWelcomeEmail(email, data)
}

const resetPasswordEmail = (email, temporaryPassword) => {
    // create mjml
    const data = {
        template: 'resetPassword',
        subject: 'Wachtwoord wijzigen',
        user: {
            temporaryPassword: temporaryPassword
        }
    }
    return EmailService.sendWelcomeEmail(email, data)
}

const requestPasswordReset = async (req, res, next) => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const tempPass = bcrypt.hashSync(randomString, bcrypt.genSaltSync());

    // get user from email
    return await User
        .findOne({
            email: req.body.email,
        })
        .exec()
        .then(async (user) => {
            if (!user) {
                return res.status(404).send(errors.UserNotFoundError);
            }

            await PasswordReset
                .deleteMany({
                    user: user._id
                })
                .exec()
                .catch(() => {
                    return res.status(404).send(errors.PasswordResetError);
                })

            return await PasswordReset
                .create({
                    user: user._id,
                    temporaryPassword: tempPass,
                })
                .then((temp) => {
                    if (!temp) {
                        return res.status(409).send(errors.ConflictError);
                    }
                    resetPasswordEmail(req.body.email, randomString)
                    return res.status(200).json({
                        code: 200,
                    });
                })
        })
}

const passwordReset = async (req, res) => {
    const user = await User
        .findOne({
            email: req.body.email,
        })
        .exec()
        .then((userInfo) => {
            if (!userInfo) {
                return;
            }

            return userInfo;
        })
        .catch(() => {
            return res.status(400).send(errors.BadRequestError);
        })

    if (!user) {
        return res.status(404).send(errors.UserNotFoundError);
    }

    const resetInfo = await PasswordReset
        .findOne({
            user: user._id,
        })
        .exec()
        .then((info) => {
            if (!info) {
                return;
            }

            if (!bcrypt.compareSync(req.body.temporaryPassword, info.temporaryPassword)) {
                return;
            }
            return info;
        })
        .catch(() => {
            return res.status(400).send(errors.BadRequestError);
        })

    if (!resetInfo) {
        return res.status(404).send(errors.PasswordResetError);
    }

    await PasswordReset
        .deleteMany({
            user: resetInfo.user
        })
        .exec()
        .catch(() => {
            return res.status(404).send(errors.PasswordResetError);
        })

    // if temp passcorrect
    await User
        .updateOne({
            email: req.body.email
        }, {
            password: bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync()),
        })
        .then(() => {
            req.session.user = user;
            req.session.save(() => {
                return res.status(200).json({
                    code: 200,
                    data: 'null'
                });
            });
        })
        .catch(() => {
            return res.status(400).send(errors.BadRequestError);
        })
}


module.exports.createUser = createUser;
module.exports.authLogin = authLogin;
module.exports.getUserInfo = getUserInfo;
module.exports.updatePassword = updatePassword;
module.exports.updateProfile = updateProfile;
module.exports.authLogout = authLogout;
module.exports.welcomeEmail = welcomeEmail;
module.exports.requestPasswordReset = requestPasswordReset;
module.exports.passwordReset = passwordReset;