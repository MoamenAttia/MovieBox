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
// import Reserve from "./components/Reserve"

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/sign_up" component={SignUp} exact/>
                        <Route path="/add_movie" component={AddMovieContainer} exact/>
                    </Switch>
                </div>
            </Router>
            <Notification />
        </div>
    );
}

export default App;
