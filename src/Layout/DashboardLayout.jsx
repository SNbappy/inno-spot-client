import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ sidebarLinks, title, children }) => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 h-screen text-white bg-gray-800">
                <div className="p-4 text-2xl font-semibold">{title}</div>
                <ul className="mt-8">
                    {sidebarLinks.map(({ name, path, icon: Icon }) => (
                        <li key={name}>
                            <Link to={path} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700">
                                {Icon && <Icon />} {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-screen p-6 border border-gray-300">
                {children} {/* Ensure content is properly displayed */}
            </div>
        </div>
    );
};

export default DashboardLayout;
