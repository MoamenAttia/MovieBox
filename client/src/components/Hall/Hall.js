import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button, Card, Col, Row} from "react-bootstrap";
import Party from "./Party";

class Hall extends Component {
    onPartyClicked = (screenId, party) => {
        this.props.onPartyClicked(screenId, party)
    };

    render() {
        const {hallNumber, parties} = this.props;
        return (
            <Card style={{width: '18rem', minHeight: "148px", marginBottom: "9px"}}>
                <Card.Body>
                    <Card.Title>Hall Number: {hallNumber}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Available Parties: {parties.length}</Card.Subtitle>
                    <Row>
                        {parties.map(party => (
                            <Col xs={3}>
                                <Party onPartyClicked={this.onPartyClicked} {...party}/>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

Hall.propTypes = {
    hallNumber: PropTypes.number.isRequired,
    parties: PropTypes.array.isRequired,
};

export default Hall;