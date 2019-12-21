import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class Party extends Component {
    onClick = (e) => {
        this.props.onPartyClicked(this.props._id, this.props.party)
    };

    render() {
        return (
            <Button block onClick={this.onClick}>{this.props.party}</Button>
        );
    }
}

export default Party;