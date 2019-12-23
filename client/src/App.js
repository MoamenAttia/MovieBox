import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './components/Home'
import SignUp from "./components/SignUp/index"
import AddMovieContainer from "./components/AddMovie";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification/Notification";
import Reserve from "./components/Reserve"
import AddScreen from "./components/AddScreen"
import NotFound from "./components/NotFound";


class App extends React.Component {
    state = {searchValue: ""}
    onSearchBoxChange = (searchValue) => {
        this.setState({searchValue})
    };

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation onSearchBoxChange={this.onSearchBoxChange}/>
                        <Switch>
                            <Route path="/" component={() => <Home searchValue={this.state.searchValue}/>} exact/>
                            <Route path="/sign_up" component={SignUp} exact/>
                            <Route path="/add_movie" component={AddMovieContainer} exact/>
                            <Route path="/movies/:id/reserve" component={Reserve} exact/>
                            <Route path="/movies/:id/addscreen" component={AddScreen} exact/>
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
                <Notification/>
            </div>
        );
    }
}

export default App;
