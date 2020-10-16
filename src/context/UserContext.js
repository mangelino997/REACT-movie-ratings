'use strict'
import axios from 'axios';
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const initial = {
    role: "",
    credentials: {},
    authenticated: false,
    error: ''
}
const UserProvider = ({ children }) => {

    // handle state
    const [user, setUser] = useState(initial);

    // handle login user
    const signin = (userData, history) => {
        axios.post('/signin', userData)
            .then(res => {
                setAuthorizationHeader(res.data.token)
                getUserData()
                history.push('/'); // go to homepage
            })
            .catch(error => {
                setUser({
                    ...user,
                    error: error.response.data.message
                })
            });
    }

    // handle logout user
    const logout = (history) => {
        localStorage.removeItem("Token");
        delete axios.defaults.headers.common['Authorization'];
        setUser(initial);
        history.push('/login');
    }

    // handle signup
    const signup = (newUser, history) => {
        axios.post('/signup', newUser)
            .then(res => {
                setAuthorizationHeader(res.data.token)
                getUserData()
                history.push('/');
            })
            .catch(error => {
                setUser({
                    ...user,
                    error: error.response.data.message
                })
            })
    }

    // set token header (codigo que se repite en login y signup)
    const setAuthorizationHeader = (token) => {
        localStorage.clear();
        localStorage.setItem('Token', `Bearer ${token}`);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token');
    };

    // obtiene los datos del usuario logueado
    const getUserData = () => {
        axios.get('/user')
            .then(res => {
                const data = {
                    credentials: res.data.userData.credentials,
                    authenticated: true,
                    error: ''
                }
                // get ratings where emailUser = user.credentials.email ???
                setUser(data)
            })
            .catch(error => console.log(error))
    }
    // handle data user
    const data = { user, signin, logout, signup, getUserData }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}
export { UserProvider }
export default UserContext;