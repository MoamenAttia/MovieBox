import React from 'react'
import {Field, reduxForm, change as reduxChange} from 'redux-form'
import validate from './validate'
import DatePicker from "react-datepicker";
import {Button, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {DateTimePicker} from 'react-widgets'
import momentLocaliser from 'react-widgets-moment'

import moment from 'moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment);

const renderError = ({meta: {touched, error}}) =>
    touched && error ? <span>{error}</span> : false

const renderDateTimePicker = ({input: {onChange, value}, meta: {touched, error}, showTime}) => {
    return <div>
        <DateTimePicker
            onChange={onChange}
            format="DD MMM YYYY"
            time={showTime}
            value={!value ? null : new Date(value)}
        />
        {touched && error ? <span>{error}</span> : false}
    </div>
};

class SelectDayOfShow extends React.Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <h1 style={{textAlign: "center", margin: "20px 0"}}>Select Date of Show</h1>
                <Form style={{margin: "0 auto", textAlign: "center", width: "300px"}} onSubmit={handleSubmit}>
                    <Field
                        name="showDate"
                        showTime={false}
                        component={renderDateTimePicker}
                    />

                    <Button style={{margin: "10px auto", width: "50%"}} block type="submit">
                        Next
                    </Button>
                </Form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false,
    validate
})(connect(null, {reduxChange})(SelectDayOfShow))