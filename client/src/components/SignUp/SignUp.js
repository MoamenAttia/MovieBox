import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Button, Form} from "react-bootstrap";
import "./styles.css"
import DatePicker from "../DatePicker/DatePicker";

const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => {
    return <Form.Group controlId="formBasicUsername">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder}/>
        {touched && error && <span className="text-danger">{error}</span>}
    </Form.Group>;
};


class SignUp extends React.Component {
    handleSubmit = ({username, password, email, firstName, lastName, birthDate}) => {
        this.props.handleSignUp(username, password, email, firstName, lastName, birthDate);
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Sign Up</h1>
                <div className="my-form">
                    <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field
                            name="firstName"
                            type="text"
                            label="First Name"
                            placeholder="Enter First Name"
                            component={renderField}
                        />
                        <Field
                            name="lastName"
                            type="text"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            component={renderField}
                        />
                        <Field
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter Username"
                            component={renderField}
                        />
                        <Field
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter Email"
                            component={renderField}
                        />

                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            component={renderField}
                        />
                        <Field
                            name="birthDate"
                            label="Birthdate"
                            placeholder="Enter your birthdate"
                            component={DatePicker}
                        />
                        <Button className="sign-in-btn btn-block" variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}


const validate = formValues => {
    const errors = {};
    if (!formValues.username) {
        errors.username = 'You must enter a username';
    }
    if (!formValues.password) {
        errors.password = 'You must enter a password';
    }
    if (!formValues.email) {
        errors.email = 'You must enter a email';
    }
    if (!formValues.firstName) {
        errors.firstName = 'You must enter a firstName';
    }
    if (!formValues.lastName) {
        errors.lastName = 'You must enter a lastName';
    }
    if (!formValues.birthDate) {
        errors.birthDate = 'You must enter a birthDate';
    }
    return errors;
};

export default reduxForm({
    form: 'signUpForm',
    validate
})(SignUp)