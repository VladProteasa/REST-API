
const mongoose = require('mongoose');

const DbSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdDate: {
        type: String
    },
    updatedDate: {
        type: String
    }
});

module.exports = mongoose.model('products', DbSchema);
