import {
    GET_AVAILABLE_SCREENS
} from '../actions/types';

const initialState = {
    screens: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AVAILABLE_SCREENS:
            return {...state, screens: action.payload}
        default:
            return state;
    }
};