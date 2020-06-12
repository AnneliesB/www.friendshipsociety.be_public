var express = require('express');
var router = express.Router();

const SubmissionController = require('./controllers/submission');
const ParamsMiddleware = require('../shared/middleware/params');
const SubmissionMiddleware = require('./middleware/submission');

router.post('/submit/:owner', ParamsMiddleware.isObjectId, SubmissionController.submit);

router.get('/', SubmissionController.getSubmissionsbyOwnerId);
router.get('/detail/:id', ParamsMiddleware.isObjectId, SubmissionMiddleware.submissionExists, SubmissionController.getSubmissionById);

module.exports = router;