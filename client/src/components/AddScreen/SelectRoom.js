import React from 'react'
import {reduxForm} from 'redux-form'
import validate from './validate'
import {Button, Col, Row} from "react-bootstrap";
import Hall from "../Hall";
import {getAvailableScreens, addScreen} from "../../actions";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";


class SelectRoom extends React.Component {
    state = {
        redirect: false
    };
    handleClick = (_id) => {
        this.props.handleSelectHall(_id)
    };

    componentDidMount() {
        const date = this.props.wizard.values.showDate;
        this.props.getAvailableScreens(date.getDate(), date.getMonth() + 1, date.getFullYear(), this.props.id)
    }

    onPartyClicked = (screenId, party, hallNumber) => {
        const date = this.props.wizard.values.showDate;
        this.props.addScreen(date.getDate(), date.getMonth() + 1, date.getFullYear(), hallNumber, party, this.props.id);
        this.setState({redirect: true});
    };

    render() {
        const {handleSubmit, previousPage} = this.props;
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1 style={{textAlign: "center", margin: "20px 0"}}>Select A Hall</h1>
                <form style={{margin: "0 auto", textAlign: "center", width: "700px"}} onSubmit={handleSubmit}>
                    <Row>
                        {this.props.screens && Object.values(this.props.screens).map((hall, idx) => (
                            <Col xs={6}>
                                <Hall onPartyClicked={(screenId, party) => {
                                    this.onPartyClicked(screenId, party, idx + 1)
                                }} hallNumber={idx + 1} parties={hall}/>
                            </Col>
                        ))}
                    </Row>
                    <div>
                        <Row>
                            <Col xs={6}>
                                <Button block variant="secondary" type="button" className="previous"
                                        onClick={previousPage}>
                                    Previous
                                </Button>
                            </Col>

                        </Row>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store, ownProps) => {
    return {wizard: store.form.addScreen, screens: store.screens.screens}
};

export default reduxForm({
    form: 'addScreen', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(connect(mapStateToProps, {getAvailableScreens, addScreen})(SelectRoom))