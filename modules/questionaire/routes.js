var express = require('express');
var router = express.Router();

const QuestionaireController = require('./controllers/questionaire');
const QuestionaireMiddleware = require('./middleware/questionaire');
const ParamsMiddleware = require('../shared/middleware/params');

router.post('/create', QuestionaireController.createQuestionaire);

router.put('/update', QuestionaireMiddleware.questionaireExists, QuestionaireController.updateQuestionaire);

router.get('/get/:owner', ParamsMiddleware.isObjectId, QuestionaireMiddleware.questionaireExistsOwnerParams, QuestionaireController.getQuestionaireByOwnerId);
router.get('/check', QuestionaireController.checkIfQuestionaireExists)

module.exports = router;