import {
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT, RESERVE_MOVIE_SCREEN
} from '../actions/types';

const initialState = {
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
        case SIGN_UP:
            return {...state, user: action.payload};
        case SIGN_OUT:
            return {...state, user: null};
        case RESERVE_MOVIE_SCREEN:
            return {...state, user: action.payload.user};
        default:
            return state;
    }
};