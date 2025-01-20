import React from "react";
import DashboardLayout from "./DashboardLayout";

const ModeratorDashboard = () => {
    const moderatorLinks = [
        { name: "Product Review Queue", path: "product-review-queue" },
        { name: "Reported Contents", path: "reported-contents" },
        { name: "Home", path: "/" },
    ];

    return <DashboardLayout sidebarLinks={moderatorLinks} title="Moderator Dashboard" />;
};

export default ModeratorDashboard;
