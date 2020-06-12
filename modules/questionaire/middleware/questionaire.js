const Questionaire = require('../models/questionaire');
const errors = require('../../../config/errors')

const questionaireExists = async (req, res, next) => {
    return await Questionaire
        .findOne({
            owner: req.session.user._id || req.params.owner || req.body.owner,
        })
        .exec()
        .then((questionaire) => {
            if (!questionaire) {
                return res.status(404).send(errors.NotFoundError);
            }

            return next()
        })
}


const questionaireExistsOwnerParams = async (req, res, next) => {
    return await Questionaire
        .findOne({
            owner: req.params.owner || req.body.owner,
        })
        .exec()
        .then((questionaire) => {
            if (!questionaire) {
                return res.status(404).send(errors.NotFoundError);
            }

            return next()
        })
}

module.exports.questionaireExists = questionaireExists;
module.exports.questionaireExistsOwnerParams = questionaireExistsOwnerParams;