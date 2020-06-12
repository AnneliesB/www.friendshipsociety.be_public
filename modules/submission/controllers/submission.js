const Submission = require('../models/submission');

const submit = async (req, res, next) => {

    return await Submission
        .create({
            owner: req.params.owner,
            items: req.body.items,
        })
        .then((submission) => {
            return res.status(200).json({
                code: 200,
                data: submission
            });
        })
        .catch(next);
}

const getSubmissionsbyOwnerId = async (req, res, next) => {
    const size = parseInt(req.query.size) > 0 ? parseInt(req.query.size) : 12;
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1

    const submissions = await Submission
        .find({
            owner: req.session.user._id
        })
        .sort({_id: -1})
        .limit(size)
        .skip((page * size) - size)
        .populate('owner', 'firstname lastname _id nickname email')
        .exec()
        .catch(next);

    const count = await Submission
        .count({
            owner: req.session.user._id
        })
        .exec()

    return res.status(200).json({
        code: 200,
        data: submissions,
        count: count
    });
}

const getSubmissionById = async (req, res, next) => {
    let currentItem = {}
    let previousItem = {};
    let nextItem = {};

    const count = await Submission
        .count({
            owner: req.session.user._id
        })
        .exec()

    return await Submission
        .find({
            owner: req.session.user._id
        })
        .exec()
        .then((submissions) => {

            for (let i = 0; i < submissions.length; i++) {
                if ((submissions[i]._id).toString() === req.params.id) {
                    previousItem = i-1 < 0 ? submissions[count-1] : submissions[i-1];
                    currentItem = submissions[i];
                    nextItem = i+1 >= count ? submissions[0] : submissions[i+1];

                }
            }
            res.status(200).json({
                code: 200,
                data: {
                    previous: previousItem,
                    current: currentItem,
                    next: nextItem,
                },
                count: count
            });

        })
        .catch(next);




}

module.exports.submit = submit;
module.exports.getSubmissionsbyOwnerId = getSubmissionsbyOwnerId;
module.exports.getSubmissionById = getSubmissionById;