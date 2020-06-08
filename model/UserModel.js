
const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    }
});

module.exports = mongoose.model('User', user);
