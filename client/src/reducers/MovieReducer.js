import _ from "lodash";

import {
    ADD_MOVIE,
    FETCH_MOVIES,
    GET_MOVIE_SCREENS, REMOVE_MOVIE,
    RESERVE_MOVIE_SCREEN
} from '../actions/types';

const initialState = {
    movies: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return {...state, movies: _.mapKeys(action.payload, '_id')};
        case GET_MOVIE_SCREENS:
            const movie = state.movies[action.payload._id].screens = action.payload.screens;
            return {...state, [movie._id]: {...movie}};
        case ADD_MOVIE:
            return {...state, movies: {...state.movies, [action.payload._id]: action.payload}};
        case REMOVE_MOVIE:
            return {...state, movies: {..._.omit(state.movies, action.payload._id)}};
        default:
            return state;
    }
};