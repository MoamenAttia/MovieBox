import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Button, Form, Row, Col} from "react-bootstrap";
import "./styles.css"
import {Link} from "react-router-dom";

const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => {
    return <Form.Group controlId="formBasicUsername">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder}/>
        {touched && error && <span className="text-danger">{error}</span>}
    </Form.Group>;
};

class SignIn extends React.Component {
    handleSubmit = (formValues) => {
        this.props.handleSignIn(formValues.username, formValues.password);
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Sign In</h1>
                <div className="my-form">
                    <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter Username"
                            component={renderField}
                        />
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            component={renderField}
                        />
                        <Row>
                            <Col xs={6}>
                                <Button className="sign-in-btn btn-block" variant="primary" type="submit">
                                    Sign In
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Link to="/sign_up">
                                    <Button className="sign-in-btn btn-block" variant="success">Sign Up</Button>
                                </Link>
                            </Col>
                        </Row>


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
    return errors;
};

export default reduxForm({
    form: 'signInForm',
    validate
})(SignIn)