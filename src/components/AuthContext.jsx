import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Simulate user session. In a real app, this would check a token/cookie.
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth status
        setTimeout(() => {
            // For demo purposes, we automatically "login" the user as admin
            // Change this to null to test the "User Manipulation Prevention"
            setUser({ id: '1', name: 'Pranav', role: 'admin' });
            setIsLoading(false);
        }, 500);
    }, []);

    const login = () => setUser({ id: '1', name: 'Pranav', role: 'admin' });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }

    if (!user) {
        // Redirect to home (or login) if not authenticated
        // This implements "User Manipulation Prevention"
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};
