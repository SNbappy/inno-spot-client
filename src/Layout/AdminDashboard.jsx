import React from "react";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
    const adminLinks = [
        { name: "Manage Users", path: "manage-users" },
        { name: "Manage Coupons", path: "manage-coupons" },
        { name: "Statistics", path: "statistics" },
        { name: "Home", path: "/" },
    ];

    return <DashboardLayout sidebarLinks={adminLinks} title="Admin Dashboard" />;
};

export default AdminDashboard;
