import React, { createContext, useState } from 'react';

const UserContext = createContext();

const initialUser = {
    id: "001",
    name: "Miguel",
    moviesRanked: []
}
const UserProvider = ({ children }) => {

    const [user, setUser] = useState(initialUser);

    // handle login user
    const login = () => {
        setUser(initialUser);
    }

    // handle logout user
    const logout = () => {
        setUser(null);
    }

    // handle data user
    const data = { user, login, logout }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}
export {UserProvider}
export default UserContext;