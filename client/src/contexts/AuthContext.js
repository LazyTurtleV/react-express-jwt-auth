import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import DataService from "../services/DataService";

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        //access token expired
        DataService.subscribeOnUnauthorizedError(() => {
            console.log('REFRESHING TOKEN...');
            AuthService.refresh();
        });
        //user unauthorized
        AuthService.subscribeOnUnauthorizedError(() => {
            console.log('REDIRECTING TO LOGIN...');
            navigate('/login');
        })
    }, [navigate]);

    const ctx = {
        login: AuthService.login,
        logout: AuthService.logout,
        refresh: AuthService.refresh,
        register: AuthService.registration,
    }

    return (
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    )
}