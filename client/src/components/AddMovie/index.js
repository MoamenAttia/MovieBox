import React, {Component} from 'react';
import AddMovieForm from "./AddMovieForm";
import {connect} from "react-redux";
import {addMovie, hideNotification, showNotification} from "../../actions";
import Notification from "../Notification/Notification";
import {Redirect} from "react-router";

class AddMovieContainer extends Component {
    handleAddMovie = (title, poster, genre, length) => {
        this.props.addMovie(title, poster, genre, length);
    };

    render() {
        const authenticated = this.props.user;
        const authorized = authenticated && this.props.user.type === 'admin';
        if (!authenticated || (authenticated && !authorized)) {
            this.props.showNotification("You Must Sign In As Admin");
            setTimeout(() => {
                this.props.hideNotification()
            }, 2000);
            return <Redirect to="/"/>
        }
        return (
            <div>
                <AddMovieForm handleAddMovie={this.handleAddMovie}/>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return {notifications: store.notifications, user: store.user.user}
};

export default connect(mapStateToProps, {showNotification, hideNotification, addMovie})(AddMovieContainer);
