import React from "react";
// import { useRole } from "./context/RoleContext";
import UserDashboard from "./userDashboard";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import { useRole } from "../hook/RoleContext";

const Dashboard = () => {
    const { role, loading } = useRole();

    console.log("Current role from context:", role); // Debugging log
    console.log("Loading state:", loading); // Debugging log

    if (loading) return <div>Loading...</div>;

    switch (role) {
        case "user":
            return <UserDashboard />;
        case "admin":
            return <AdminDashboard />;
        case "moderator":
            return <ModeratorDashboard />;
        default:
            return <div>Unauthorized Access</div>;
    }
};

export default Dashboard;
