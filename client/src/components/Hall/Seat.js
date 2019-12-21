import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {reserveMovie} from "../../actions";
import {connect} from 'react-redux';


class Seat extends Component {
    onClick = () => {
        const {reserveMovie, screenId, userId, row, col} = this.props;
        reserveMovie(screenId, userId, row, col);
    };

    render() {
        let myTicket = 0;
        const {screenId, row, col} = this.props;
        this.props.user.tickets.forEach(ticket => {
            if (ticket.screenId === screenId && ticket.row === row && ticket.col === col) {
                myTicket = 1;
            }
        });
        return (
            <Button variant={myTicket ? 'success' : this.props.reserved ? 'secondary' : 'primary'}
                    onClick={this.onClick} block
                    style={{height: "20px", marginBottom: "20px"}}/>
        );
    }
}

const mapStateToProps = store => {
    return {user: store.user.user}
};

export default connect(mapStateToProps, {reserveMovie})(Seat);