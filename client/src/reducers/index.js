import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import UserReducer from './UserReducer';
import ScreenReducer from './ScreensReducer';
import MovieReducer from './MovieReducer';
import NotificationReducer from "./NotificationReducer";

export default combineReducers({
    user: UserReducer,
    screens: ScreenReducer,
    movies: MovieReducer,
    form: formReducer,
    notifications: NotificationReducer
});
