import React from 'react'
import {reduxForm} from 'redux-form'
import validate from './validate'
import {Button, Col, Row} from "react-bootstrap";
import Hall from "../Hall";
import {getMovieScreens} from "../../actions";
import {connect} from 'react-redux';


class SelectRoom extends React.Component {
    state = {
        redirect: false
    };

    componentDidMount() {
        const date = this.props.wizard.values.showDate;
        this.props.getMovieScreens(date.getDate(), date.getMonth() + 1, date.getFullYear(), this.props.id);
    }

    onPartyClicked = (screenId, party, hallNumber) => {
        this.props.onPartyClicked(screenId)
    };

    render() {
        const {handleSubmit, previousPage} = this.props;
        return (
            <div>
                <h1 style={{textAlign: "center", margin: "20px 0"}}>Select A Hall</h1>
                <form style={{margin: "0 auto", textAlign: "center", width: "700px"}} onSubmit={handleSubmit}>
                    <Row>
                        {this.props.movie && this.props.movie.screens && Object.values(this.props.movie.screens).map((hall, idx) => (
                            <Col xs={6}>
                                <Hall onPartyClicked={this.onPartyClicked} hallNumber={idx + 1} parties={hall}/>
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
    return {movie: store.movies.movies[ownProps.id], wizard: store.form.wizard}
};

export default reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(connect(mapStateToProps, {getMovieScreens})(SelectRoom))