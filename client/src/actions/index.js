import {
    ASSIGN_SCREEN,
    GET_AVAILABLE_SCREENS,
    FETCH_MOVIES,
    GET_MOVIE_SCREENS,
    FETCH_SCREEN,
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    REMOVE_MOVIE,
    RESERVE_MOVIE_SCREEN,
    WHO_AM_I,
    ERROR, ADD_MOVIE, SHOW_NOTIFICATION, HIDE_NOTIFICATION
} from "./types"
import axios from "../apis"


export const whoAmI = (token) => async dispatch => {
    try {
        let response = await axios.get("/users/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        dispatch({type: SIGN_IN, payload: response.data});
    } catch (error) {
        handleError(error, dispatch);
    }
};

export const signIn = (username, password) => async dispatch => {
    try {
        let response = await axios.post('/users/login', {username, password});
        localStorage.setItem("userToken", response.data.token);
        dispatch({type: SIGN_IN, payload: response.data.user});
        showPopUp(`Welcome ${response.data.user.firstName}`, dispatch);
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const signUp = (username, password, email, firstName, lastName, birthDate) => async dispatch => {
    try {
        let response = await axios.post('/users', {username, password, email, firstName, lastName, birthDate});
        localStorage.setItem("userToken", response.data.token);
        dispatch({type: SIGN_UP, payload: response.data.user});
        showPopUp(`Welcome ${firstName}`, dispatch);
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const signOut = () => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        await axios.post("/users/logout", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        localStorage.removeItem("userToken");
        dispatch({type: SIGN_OUT});
        showPopUp("Sign Out Successfully", dispatch);
    } catch (error) {
        dispatch({type: SIGN_OUT});
        handleError(error, dispatch)
    }
};

export const fetchMovies = () => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.get('/movies', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: FETCH_MOVIES, payload: response.data});
    } catch (error) {
        handleError(error, dispatch);
    }
};

export const removeMovie = (_id) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.delete(`/movies/${_id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: REMOVE_MOVIE, payload: response.data});
        showPopUp(`Title: ${response.data.title} Movie Removed Successfully`, dispatch)
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const fetchScreen = _id => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.get(`/screens/${_id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: FETCH_SCREEN, payload: response.data});
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const getMovieScreens = (day, month, year, _id) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.get(`/movies/${_id}/screens`, {
            params: {
                day,
                month,
                year
            },
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: GET_MOVIE_SCREENS, payload: {screens: response.data, _id: _id}});
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const addScreen = (day, month, year, screenNumber, party, _id) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.post(`/movies/${_id}/assignscreen`, {
            day,
            month,
            year,
            movieId: _id,
            screenNumber,
            party
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: ASSIGN_SCREEN, payload: response.data});
    } catch (error) {
        handleError(error, dispatch);
    }
};

export const getAvailableScreens = (day, month, year, _id) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.get(`/movies/${_id}/available_screens`, {
            params: {
                day, month, year
            },
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: GET_AVAILABLE_SCREENS, payload: response.data});
    } catch (error) {
        handleError(error, dispatch);
    }

};

export const reserveMovie = (screenId, userId, row, col) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.post(`/screens/${screenId}`, {userId, row, col}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: RESERVE_MOVIE_SCREEN, payload: response.data});
    } catch (error) {
        handleError(error, dispatch);
    }

};

export const addMovie = (title, poster, genre, length) => async dispatch => {
    try {
        let token = localStorage.getItem("userToken");
        const response = await axios.post(`/movies`, {title, poster, genre, length}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        dispatch({type: ADD_MOVIE, payload: response.data});
        showPopUp("Movie Added Successfully", dispatch);
    } catch (error) {
        handleError(error, dispatch)
    }
};

export const showNotification = message => {
    return {
        type: SHOW_NOTIFICATION,
        payload: message
    }
};

export const hideNotification = () => {
    return {
        type: HIDE_NOTIFICATION
    }
};


function showPopUp(message, dispatch) {
    dispatch({type: SHOW_NOTIFICATION, payload: message});
    setTimeout(() => {
        dispatch({type: HIDE_NOTIFICATION})
    }, 2000)
}


function handleError(error, dispatch) {
    if (error && error.response && error.response.status === 403) {
        showPopUp("Admin Only", dispatch);
    } else if (error && error.response && error.response.status === 401) {
        showPopUp("Please Authenticate", dispatch);
    }
    if (error && error.response && error.response.data && error.response.data.message) {
        dispatch({type: ERROR, payload: error.response.data.message});
        showPopUp(error.response.data.message, dispatch);
    } else if (error && error.response && error.response.data && error.response.data.errmsg) {
        dispatch({type: ERROR, payload: error});
        showPopUp(error.response.data.errmsg, dispatch);
    } else if (error && error.response && error.response.data && error.response.data.message) {
        dispatch({type: ERROR, payload: error});
        showPopUp(error.response.data.message, dispatch);
    } else {
        dispatch({type: error.message, payload: error});
        showPopUp(ERROR, dispatch);
    }
}

