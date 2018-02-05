var mongoose = require('mongoose');
//here we initialize databse inserting params
module.exports = mongoose.model('Food', {
    text: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 0
    },
    predicted: {
        type: Number,
        default: 0
    },
    createdTillNow: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    }
});