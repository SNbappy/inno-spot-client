import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRole } from "../hook/RoleContext"; // Or from the context if you have it

const PrivateRoute = ({ children, allowedRoles }) => {
    const { role, loading } = useRole(); // Assuming role and loading state are provided by context
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner while checking the role
    }

    if (!role) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to unauthorized page if role is not allowed
        return <Navigate to="/unauthorized" replace />;
    }

    // Render the protected route's children if all checks pass
    return children;
};

export default PrivateRoute;
