import React, { createContext, useState, useEffect } from 'react';
import { getProfile, logout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user profile on app load if token exists
        const fetchProfile = async () => {
            try {
                const userProfile = await getProfile();
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                setUser(null);
            }
        };

        if (localStorage.getItem('token')) {
            fetchProfile();
        }
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
