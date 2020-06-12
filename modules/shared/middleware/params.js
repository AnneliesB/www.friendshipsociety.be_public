const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const errors = require('../../../config/errors')

const isObjectId = (req, res, next) => {
    const id = req.params.id || req.body.owner || req.params.owner || req.body.id;

    if (!objectIdRegex.test(id)) {
        return res.status(400).send(errors.InvalidObjectIdError);
    }

    return next();
}

module.exports.isObjectId = isObjectId;