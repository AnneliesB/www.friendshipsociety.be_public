const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const passwordResetSchema = new Schema({
    user: {
        type: SchemaTypes.String,
        required: true,
    },
    temporaryPassword: {
        type: SchemaTypes.String,
        required: true,
    }
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;