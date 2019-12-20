const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


movieSchema.statics.findMovieById = async movieId => {
    const movie = await Movie.findOne({ movieId });
    if (!movie) {
        throw new Error('Unable to find this movie');
    }
    return movie
}

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
