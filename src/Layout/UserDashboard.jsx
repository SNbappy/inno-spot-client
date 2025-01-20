import React from "react";
import DashboardLayout from "./DashboardLayout";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";

const UserDashboard = () => {
    const userLinks = [
        { name: "My Profile", path: "profile" },
        { name: "Add Product", path: "add-product" },
        { name: "My Products", path: "my-products" },
        { name: "Home", path: "/", icon: IoHome },
        { name: "Products", path: "/products", icon: AiOutlineProduct },
    ];

    return <DashboardLayout sidebarLinks={userLinks} title="User Dashboard" />;
};

export default UserDashboard;
