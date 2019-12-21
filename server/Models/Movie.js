const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
    },
    genre: {
        type: String,
        required: true,
        minlength: 3,
    },
    length: {
        type: Number,
        required: true,
        min: 10
    },
    poster: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


movieSchema.statics.findMovieById = async movieId => {
    const movie = await Movie.findOne({movieId});
    if (!movie) {
        throw new Error('Unable to find this movie');
    }
    return movie
};

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
