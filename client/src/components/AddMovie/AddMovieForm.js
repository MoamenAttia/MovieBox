import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Button, Form, Row, Col} from "react-bootstrap";
import "./styles.css"
import validator from "validator";

const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => {
    return <Form.Group controlId="formBasicUsername">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder}/>
        {touched && error && <span className="text-danger">{error}</span>}
    </Form.Group>;
};

class AddMovieForm extends React.Component {
    handleSubmit = formValues => {
        this.props.handleAddMovie(formValues.title, formValues.poster, formValues.genre, formValues.length);
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Add Movie</h1>
                <div className="my-form">
                    <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field
                            name="title"
                            type="text"
                            label="Title"
                            placeholder="Enter Title"
                            component={renderField}
                        />
                        <Field
                            name="genre"
                            type="text"
                            label="Genre"
                            placeholder="Enter Genre/s"
                            component={renderField}
                        />
                        <Field
                            name="length"
                            type="text"
                            label="Length"
                            placeholder="Enter Length/s"
                            component={renderField}
                        />
                        <Field
                            name="poster"
                            type="text"
                            label="Poster"
                            placeholder="Enter Poster"
                            component={renderField}
                        />
                        <Button className="sign-in-btn btn-block" variant="primary" type="submit">
                            Add Movie
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}


const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.poster || !validator.isURL(formValues.poster)) {
        errors.poster = 'You must enter a valid poster url';
    }
    if (!formValues.length || (formValues.length && isNaN(formValues.length))) {
        errors.length = 'You must enter a length';
    }
    if (!formValues.genre) {
        errors.genre = 'You must enter a genre';
    }
    return errors;
};

export default reduxForm({
    form: 'addMovieForm',
    validate
})(AddMovieForm)