const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const submissionSchema = new Schema({
    owner: {
        type: SchemaTypes.String, 
        ref: 'User',
        required: true,
    },
    items: [{
        type: SchemaTypes.Object,
        required: true,
    }]
});

const Submission = mongoose.model('submission', submissionSchema);

module.exports = Submission;
