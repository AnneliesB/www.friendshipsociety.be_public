const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const questionaireSchema = new Schema({
    owner: {
        type: SchemaTypes.String, 
        ref: 'User',
        required: true,
    },
    items: [{
        type: SchemaTypes.String,
        required: true,
    }],
    initial: {
        type: SchemaTypes.Boolean, 
        required: true,
    }
});

const Questionaire = mongoose.model('questionList', questionaireSchema);

module.exports = Questionaire;
