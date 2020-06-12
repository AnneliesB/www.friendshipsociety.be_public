const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const userSchema = new Schema({
    firstname: {
        type: SchemaTypes.String,
        required: true,
    },
    lastname: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
    },
    nickname: {
        type: SchemaTypes.String,
        required: false,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;