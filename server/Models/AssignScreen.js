const mongoose = require('mongoose');

// this table is intended to help to discove the screens of the movies.
const assignScreenSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    party: {
        type: Number,
        required: true,
    },
    movieId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    screenNumber: {
        type: Number,
        required: true
    },
    screenId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {
    timestamps: true
})


assignScreenSchema.statics.findAvailableScreens = async (day, month, year) => {
    const notAvParties = await assignScreen.find({ day, month, year });
    const halls = {
        "1": [3, 6, 9, 12],
        "2": [3, 6, 9, 12],
        "3": [3, 6, 9, 12],
        "4": [3, 6, 9, 12],
    }
    notAvParties.forEach(party => {
        let partyObject = party.toObject();
        const screenNumber = `${partyObject.screenNumber}`;
        halls[screenNumber] = halls[screenNumber].filter(val => val != partyObject.party);
    })
    return halls;
}

assignScreenSchema.statics.findScreenForAMovie = async (day, month, year, movieId) => {
    const notAvParties = await assignScreen.find({ day, month, year, movieId });
    const halls = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
    }
    notAvParties.forEach(party => {
        let partyObject = party.toObject();
        const screenNumber = `${partyObject.screenNumber}`;
        halls[screenNumber].push({ _id: partyObject.screenId, party: partyObject.party });
    })
    return halls;
}

const assignScreen = mongoose.model('AssignScreen', assignScreenSchema)

module.exports = assignScreen
