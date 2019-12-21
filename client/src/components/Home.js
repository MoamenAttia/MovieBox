import React, {Component} from 'react';
import {connect} from "react-redux";
import {signIn, removeMovie, fetchMovies} from "../actions";
import {Link} from "react-router-dom";
// Components
import SignIn from "./SignIn/SignIn";
import {Row, Col, Button} from "react-bootstrap";
import MovieCard from "./MovieCard";
import Notification from "./Notification/Notification";

class Home extends Component {
    handleSignIn = (username, password) => {
        this.props.signIn(username, password)
    };

    removeMovie = (_id) => {
        this.props.removeMovie(_id)
    };

    componentDidMount() {
        if (this.props.user) {
            this.props.fetchMovies()
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.user !== this.props.user) {
            this.props.fetchMovies()
        }
    }


    render() {
        const {user, movies} = this.props;
        const isAdmin = user && user.type === 'admin';
        return (
            <div>
                {!user && (<SignIn handleSignIn={this.handleSignIn}/>)}
                {user && movies && (
                    <div>
                        <Row>
                            {movies.map(movie => (
                                <Col xs={3}><MovieCard {...movie} removeMovie={this.removeMovie} admin={isAdmin}/></Col>
                            ))}
                        </Row>
                        {user.type === 'admin' && (<Link to="/add_movie">
                            <Button variant="success" style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                position: "fixed",
                                right: "5px",
                                bottom: "5px",
                                fontSize: "25px",
                                fontFamily: "bold",
                            }}>+</Button>
                        </Link>)}
                    </div>)}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {user: store.user.user, movies: Object.values(store.movies.movies), signInForm: store.form.signInForm}
};

export default connect(mapStateToProps, {signIn, removeMovie, fetchMovies})(Home);