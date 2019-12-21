const mongoose = require('mongoose');
const _ = require("lodash");

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
});

assignScreenSchema.statics.findAvailableScreens = async (day, month, year) => {
    const notAvParties = await assignScreen.find({day, month, year});
    const halls = {
        "1": [{party: 1}, {party: 3}, {party: 5}, {party: 7}],
        "2": [{party: 1}, {party: 3}, {party: 5}, {party: 7}],
        "3": [{party: 1}, {party: 3}, {party: 5}, {party: 7}],
        "4": [{party: 1}, {party: 3}, {party: 5}, {party: 7}],
    };
    notAvParties.forEach(party => {
        let partyObject = party.toObject();
        const screenNumber = `${partyObject.screenNumber}`;
        halls[screenNumber] = halls[screenNumber].filter(val => val.party !== partyObject.party);
    });
    return halls;
};

assignScreenSchema.statics.findScreenForAMovie = async (day, month, year, movieId) => {
    const notAvParties = await assignScreen.find({day, month, year, movieId});
    const halls = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
    };
    notAvParties.forEach(party => {
        let partyObject = party.toObject();
        const screenNumber = `${partyObject.screenNumber}`;
        halls[screenNumber].push({_id: partyObject.screenId, party: partyObject.party});
    });
    Object.keys(halls).map(key => {
        halls[key] = _.sortBy(halls[key], ["party"]);
    });
    return halls;
};

assignScreenSchema.index({day: 1, month: 1, year: 1, party: 1, screenNumber: 1}, {unique: true});

const assignScreen = mongoose.model('AssignScreen', assignScreenSchema);
module.exports = assignScreen;
