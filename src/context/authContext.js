import React, { useState, useEffect, createContext, useContext } from 'react';
import { myInfo } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userInfo = await myInfo();
                setUser(userInfo.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);