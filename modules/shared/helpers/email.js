const mjml = require('mjml');
const mustache = require('mustache');
const fs = require('fs');
const errors = require('../../../config/errors')

function parse(template, data) {
    if (template === 'welcome' || template === 'resetPassword') {
        const mjmlString = fs.readFileSync(`./modules/shared/helpers/templates/${template}.mjml`).toString();
        return mustache.render(mjml(mjmlString).html, data);
    } else {
        return 'invalid template'
    }
}

module.exports.parse = parse;