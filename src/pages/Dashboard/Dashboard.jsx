import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 h-screen text-white bg-gray-800">
                <div className="p-4 text-2xl font-semibold">InnoSpot Dashboard</div>
                <ul className="mt-8">
                    <li>
                        <Link to="profile" className="block px-4 py-2 hover:bg-gray-700">
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="add-product" className="block px-4 py-2 hover:bg-gray-700">
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link to="my-products" className="block px-4 py-2 hover:bg-gray-700">
                            My Products
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <hr className="my-4" />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
