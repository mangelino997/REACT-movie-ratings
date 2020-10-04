import React from 'react'
import userLogo from '../no-img.png'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import NotFound from '../pages/notFound';
import Details from './Details';

const NavBar = () => {
    return (
        <>
            <Router>
                <div className="topnav">
                    <Link to="/">Home </Link>
                    <Link to="/login"> Login </Link>
                    <Link to="/signup"> Signup </Link>
                    <Link to="/user" className="chip icon">
                        <img src={userLogo} className="userLogo" />John Doe
        </Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/details/:movieId" component={Details} />
                    <Route component={NotFound}/>
                </Switch>

            </Router>

        </>
    )
}

export default NavBar
