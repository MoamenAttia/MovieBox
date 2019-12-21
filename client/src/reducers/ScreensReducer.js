import {
    FETCH_SCREEN,
    GET_AVAILABLE_SCREENS, RESERVE_MOVIE_SCREEN
} from '../actions/types';

const initialState = {
    screens: null,
    activeScreen: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AVAILABLE_SCREENS:
            return {...state, screens: action.payload};
        case FETCH_SCREEN:
            return {...state, activeScreen: action.payload};
        case RESERVE_MOVIE_SCREEN:
            return {...state, activeScreen: action.payload.screen};
        default:
            return state;
    }
};