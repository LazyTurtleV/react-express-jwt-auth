import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import DataService from "../services/DataService";

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    
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
        login: async (email, password) => {
            const { accessToken, user } = await AuthService.login(email, password);
            setUser(user);
            setToken(accessToken);
        },
        logout: async () => {
            await AuthService.logout();
        },
        refresh: async (email, password) => {
            const { accessToken, user } = await AuthService.refresh();
            setUser(user);
            setToken(accessToken);
        },
        register: async (email, password) => { 
            const { accessToken, user } = await AuthService.registration(email, password);
            setUser(user);
            setToken(accessToken);
        },
        user,
        token,
    }

    return (
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    )
}