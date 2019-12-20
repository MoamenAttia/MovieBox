const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
    screenNumber: {
        type: Number,
        required: true,
    },
    party: {
        type: Number
    },
    seats: {
        type: Array,
    },
}, {
    timestamps: true
})

const Screen = mongoose.model('Screen', screenSchema)

module.exports = Screen
