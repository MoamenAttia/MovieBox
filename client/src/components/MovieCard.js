import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

class MovieCard extends Component {
    removeMovie = () => {
        this.props.removeMovie(this.props._id);
    };

    render() {
        const {poster, title, genre, length, admin, _id} = this.props;
        return (
            <div style={{marginTop: "10px", marginBottom: "10px"}}>
                <Card>
                    {admin ? (<Button onClick={this.removeMovie} style={{
                        position: "absolute",
                        top: "4px",
                        right: "5px",
                        fontWeight: "bold",
                        borderRadius: "50%"
                    }}
                                      variant="danger">X</Button>) : null}
                    <Card.Img variant="top" thumbnail style={{height: "300px", width: "100%"}} src={poster}/>
                    <Card.Body style={{height: "200px"}}>
                        <Card.Title className="text-center">{title}</Card.Title>
                        <Card.Text><strong>Genre:</strong> {genre}</Card.Text>
                        <Card.Text><strong>Length:</strong> {length} minutes</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={admin ? `movies/${_id}/addscreen` : `movies/${_id}/reserve`}>
                            <Button block>{admin ? "Add Screen" : "Reserve"}</Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default MovieCard;