import React from 'react'
import {Field, reduxForm} from 'redux-form'
import validate from './validate'
import {connect} from "react-redux";
import {fetchScreen} from "../../actions";
import {Button, Col, Image, Row} from "react-bootstrap";
import screenImage from '../../images/cinema.jpg';
import Seat from "../Hall/Seat";

class Screen extends React.Component {
    componentDidMount() {
        this.props.fetchScreen(this.props.screenId)
    }

    render() {
        const {screenId, user} = this.props;
        return (
            <div style={{width: "75%", margin: "0 auto"}}>
                <Image src={screenImage} fluid
                       style={{width: "100%", height: "200px", marginBottom: "20px", marginTop: "20px"}}/>
                <form onSubmit={this.props.handleSubmit}>
                    {this.props.screen && this.props.screen.seats.map((row, rowIdx) => (
                        <Row>
                            {row.map((col, colIdx) => (
                                <Col xs={1}>
                                    <Seat reserved={col} screenId={screenId} userId={user._id} row={rowIdx}
                                          col={colIdx}/>
                                </Col>
                            ))}
                        </Row>
                    ))}
                </form>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {screen: store.screens.activeScreen, user: store.user.user}
};


export default reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(connect(mapStateToProps, {fetchScreen})(Screen))