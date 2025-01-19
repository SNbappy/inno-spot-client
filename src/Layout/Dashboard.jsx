import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
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
                    <li>
                        <Link to="product-review-queue" className="block px-4 py-2 hover:bg-gray-700">
                            Product Review Queue
                        </Link>
                    </li>
                    <li>
                        <Link to="reported-contents" className="block px-4 py-2 hover:bg-gray-700">
                            Reported Contents
                        </Link>
                    </li>
                    <li>
                        <Link to="manage-users" className="block px-4 py-2 hover:bg-gray-700">
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link to="statistics" className="block px-4 py-2 hover:bg-gray-700">
                            Statistics
                        </Link>
                    </li>
                    <hr className="my-3" />
                    <li>
                        <Link to="/" className="flex items-center gap-1 px-4 py-2 hover:bg-gray-700">
                            <IoHome />Home
                        </Link>
                        <Link to="/products" className="flex items-center gap-1 px-4 py-2 hover:bg-gray-700">
                            <AiOutlineProduct />Products
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
