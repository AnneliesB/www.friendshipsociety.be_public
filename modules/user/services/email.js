const nodemailer = require('nodemailer');
const emailHelper = require('../../shared/helpers/email')
const errors = require('../../../config/errors')

async function sendWelcomeEmail (email, data){
    const emailTemplate = emailHelper.parse(data.template, data);
    if(emailTemplate === 'invalid template'){
        return res.status(404).send(errors.InvalidTemplateError);
    }

    let transporter = nodemailer.createTransport({
        host: "smtp-auth.mailprotect.be",
        port: 587,
        secure: false,
        auth: {
            user: 'hello@friendshipsociety.be',
            pass: '',
        },
    });

    let info = await transporter.sendMail({
        from: 'hello@friendshipsociety.be',
        to: email,
        subject: data.subject,
        text: "Hello from Friendship Society",
        html: emailTemplate,
    });

    return info;
}

module.exports.sendWelcomeEmail = sendWelcomeEmail;