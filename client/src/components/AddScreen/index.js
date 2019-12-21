import WizardForm from "./WizardForm"

import React, {Component} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {hideNotification, showNotification} from "../../actions";

class Reserve extends Component {
    onSubmit = (formValues) => {

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
            <WizardForm id={this.props.match.params.id} onSubmit={this.onSubmit}/>
        );
    }
}

const mapStateToProps = (store) => {
    return {user: store.user.user};
};
export default connect(mapStateToProps, {showNotification, hideNotification})(Reserve);

