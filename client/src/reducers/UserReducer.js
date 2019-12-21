import {
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT
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
        default:
            return state;
    }
};