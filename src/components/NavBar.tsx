import React, { useContext } from 'react'
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
import UserContext from '../context/UserContext';
import Dashboard from '../pages/dashboard';

const NavBar = () => {

    // consumer the movie context
    const { user } = useContext(UserContext);

    return (
        <>
            <Router>
                <div className="topnav">
                    <Link to="/">Home </Link>
                    <Link to="/login"> Login </Link>
                    <Link to="/signup"> Signup </Link>
                    {user ?
                        (<Link to="/dashboard" className="chip icon">
                            <img src={userLogo}
                                className="userLogo"
                            />
                            {user.name}
                        </Link>) :
                        (
                            <Link to="/login" className="chip icon">
                                <img src={userLogo}
                                    className="userLogo"
                                />
                                Login
                            </Link>
                        )}
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/details/:movieId" component={Details} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>

            </Router>

        </>
    )
}

export default NavBar
