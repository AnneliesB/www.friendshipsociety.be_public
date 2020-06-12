const Questionaire = require('../models/questionaire');
const errors = require('../../../config/errors')

const createQuestionaire = async (req, res, next) => {
    return await Questionaire
        .findOneAndUpdate({
            owner: req.session.user._id
        }, {
            items: req.body.questions,
            initial: false,
        })
        .then((questionaire) => {
            if (!questionaire) {
                return res.status(200).json({
                    code: 400,
                    data: ''
                });
            }

            return res.status(200).json({
                code: 200,
                data: questionaire
            });
        })
        .catch(next);
}

const updateQuestionaire = async (req, res, next) => {
    return await Questionaire
        .findOneAndUpdate({
            owner: req.session.user._id
        }, {
            items: req.body.questions,
            initial: false,
        })
        .then((questionaire) => {
            return res.status(200).json({
                code: 200,
                data: questionaire
            });
        })
        .catch(next);
}

const getQuestionaireByOwnerId = async (req, res, next) => {
    return await Questionaire
        .findOne({
            owner: req.params.owner
        })
        .populate('owner', 'firstname lastname _id nickname email')
        .exec()
        .then((questionaire) => {
            return res.status(200).json({
                code: 200,
                data: questionaire
            });
        })
        .catch(next);
}

const checkIfQuestionaireExists = async (req, res, next) => {
    return await Questionaire
        .findOne({
            owner: req.session.user._id
        })
        .exec()
        .then((questionaire) => {
            if (!questionaire) {
                return res.status(404).send(errors.NotFoundError);
            }

            return res.status(200).json({
                code: 200,
                data: questionaire
            });
        })
        .catch(next);
}

module.exports.createQuestionaire = createQuestionaire;
module.exports.updateQuestionaire = updateQuestionaire;
module.exports.getQuestionaireByOwnerId = getQuestionaireByOwnerId;
module.exports.checkIfQuestionaireExists = checkIfQuestionaireExists;