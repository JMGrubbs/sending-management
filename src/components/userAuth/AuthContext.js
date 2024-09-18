import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(true);

    const login = (username, password) => {
        if (username === "user" && password === "pass") {
            setAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
