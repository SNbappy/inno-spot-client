import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRole } from "../hook/RoleContext";
// import { useRole } from "../context/RoleContext";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { role, loading } = useRole();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner while checking the role
    }

    if (!role) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children; // Render the children if all checks pass
};

export default PrivateRoute;
