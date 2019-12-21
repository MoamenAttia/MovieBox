import React, {Component} from 'react';
import {Navbar, Form, FormControl, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../actions";

class Navigation extends Component {
    handleSignOut = () => {
        this.props.signOut()
    };
    onTextChange = (e) => {
        this.props.onSearchBoxChange(e.target.value);
    };

    render() {
        return (
            <Navbar className="bg-light justify-content-between">
                <Navbar.Brand><Link to="/"><Button variant="dark">Home</Button></Link></Navbar.Brand>
                {this.props.user && (<Form inline>
                    <FormControl type="text" placeholder="Search" onChange={this.onTextChange} className="mr-sm-2"/>
                </Form>)}
                {this.props.user && (
                    <Link to="/" className="mr-sm-2"><Button onClick={this.handleSignOut} variant="dark">Sign
                        Out</Button></Link>)}
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user.user}
};

export default connect(mapStateToProps, {signOut})(Navigation);

