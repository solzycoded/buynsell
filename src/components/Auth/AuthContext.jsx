import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await fetch('http://localhost:3000/session', { 
                    method: "GET", 
                    credentials : "include",
                })
                .then(response => response.json())
                .then(response => {
                    setUser(response.user);
                })
                .catch(err => {
                    console.log(err);
                    setUser(null);
                });
            } 
            catch (error) {
                console.log(error);
                setUser(null);
            } 
            finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
