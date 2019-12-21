import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SelectDayOfShow from './SelectDayOfShow';
import SelectRoom from './SelectRoom'
import {fetchScreen} from "../../actions";
import {connect} from "react-redux";
import {change as reduxChange} from "redux-form";


class WizardForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    state = {
        page: 1,
        screenId: null
    };

    nextPage() {
        this.setState({page: this.state.page + 1})
    }

    previousPage() {
        this.setState({page: this.state.page - 1})
    }

    handleSelectHall = (_id) => {
        alert(_id);
    };

    onPartyClicked = (screenId) => {
        this.setState({screenId});
        this.nextPage();
    };

    render() {
        const {page} = this.state;
        return (
            <div>
                {page === 1 &&
                <SelectDayOfShow onSubmit={this.nextPage}/>}
                {page === 2 && (
                    <SelectRoom
                        id={this.props.id}
                        handleSelectHall={this.handleSelectHall}
                        previousPage={this.previousPage}
                        onPartyClicked={this.onPartyClicked}
                        onSubmit={this.nextPage}
                    />
                )}
            </div>
        )
    }
}

WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (store, ownProps) => {
    return {wizard: store.form.wizard}
};

export default connect(mapStateToProps, {reduxChange, fetchScreen})(WizardForm);