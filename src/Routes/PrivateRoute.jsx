import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user } = useUserContext();

    if (!user) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the children if the user is authenticated
    return children;
};

export default PrivateRoute;