const Submission = require('../models/submission');
const errors = require('../../../config/errors')

const submissionExists = async (req, res, next) => {

    return await Submission
        .findOne({
            _id: req.params.id || req.body.id,
        })
        .exec()
        .then((submission) => {
            if (!submission) {
        
                return res.status(404).send(errors.NotFoundError);
            }
 

            return next()
        })
}

module.exports.submissionExists = submissionExists;