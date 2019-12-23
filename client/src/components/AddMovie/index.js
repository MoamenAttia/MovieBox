import React, {Component} from 'react';
import AddMovieForm from "./AddMovieForm";
import {connect} from "react-redux";
import {addMovie, hideNotification, showNotification, whoAmI} from "../../actions";
import Notification from "../Notification/Notification";
import {Redirect} from "react-router";

class AddMovieContainer extends Component {
    handleAddMovie = (title, poster, genre, length) => {
        this.props.addMovie(title, poster, genre, length);
    };

    componentWillMount() {
        const token = localStorage.getItem("userToken");
        if (token && !this.props.user) {
            this.setState({wait: true}, () => {
                this.props.whoAmI(token).then(() => {
                    this.setState({wait: false})
                })
            })
        }
    }


    state = {
        wait: false
    };


    render() {
        if (this.state.wait) {
            return null
        }
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

export default connect(mapStateToProps, {showNotification, hideNotification, addMovie, whoAmI})(AddMovieContainer);
