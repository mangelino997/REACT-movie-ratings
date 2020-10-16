import React, { useContext, useEffect, useState } from 'react'
import userLogo from '../no-img.png'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
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
    useEffect(() => {

      
    }, [user])
    return (
        <>
            <Router>
                <div className="topnav">
                    <Link to="/">Home </Link>

                    {user.authenticated ?
                        (<Link to="/dashboard" className="chip icon">
                            <img src={user.credentials ? user.credentials.avatar : userLogo}
                                className="userLogo"
                            />
                            <small>
                                {user.credentials?.username}
                            </small>

                        </Link>) :
                        (
                            <>
                                <Link to="/login"> Login </Link>
                                <Link to="/signup"> Signup </Link>
                                <Link to="/login" className="chip icon">
                                    <img src={userLogo}
                                        className="userLogo"
                                    />
                            </Link>
                            </>
                        )}
                </div>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/details/:movieId" component={Details} />
                    {!user.authenticated ?
                        <>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Redirect to='/login' />
                        </>
                        :
                        <>
                            <Route path="/dashboard" component={Dashboard} />
                            
                        </>
                    }
                    < Route component={NotFound} />
                </Switch>
            </Router>
        </>
    )
}

export default NavBar
