import React, {Component} from 'react';
import SignUp from "./SignUp";
import {connect} from "react-redux";
import {signUp} from "../../actions";
import {Redirect} from "react-router";

class SignUpContainer extends Component {
    handleSignUp = (username, password, email, firstName, lastName, birthDate) => {
        this.props.signUp(username, password, email, firstName, lastName, birthDate)
    };

    render() {
        if (this.props.user) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <SignUp handleSignUp={this.handleSignUp}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {user: store.user.user}
};

export default connect(mapStateToProps, {signUp})(SignUpContainer);