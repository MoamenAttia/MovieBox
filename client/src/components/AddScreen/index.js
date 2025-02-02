import WizardForm from "./WizardForm"

import React, {Component} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {hideNotification, showNotification, whoAmI, fetchMovies} from "../../actions";

class AddScreen extends Component {
    onSubmit = (formValues) => {

    };
    state = {
        wait: false
    };

    componentWillMount() {
        const token = localStorage.getItem("userToken");
        if (token && !this.props.user) {
            this.setState({wait: true}, () => {
                this.props.whoAmI(token).then(() => {
                    this.props.fetchMovies().then(response => {
                        this.setState({wait: false})
                    })
                })
            })
        }
    }


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
            <WizardForm id={this.props.match.params.id} onSubmit={this.onSubmit}/>
        );
    }
}

const mapStateToProps = (store) => {
    return {user: store.user.user};
};
export default connect(mapStateToProps, {showNotification, hideNotification, whoAmI, fetchMovies})(AddScreen);

