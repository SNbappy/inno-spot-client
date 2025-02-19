import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import { IoHome } from "react-icons/io5";
import { AiOutlineAppstore } from "react-icons/ai";
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Corrected import

const UserDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();  // Get the auth instance

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current User:", currentUser); // Debugging
            if (currentUser) {
                setUser({
                    name: currentUser.displayName || "User",
                    image: currentUser.photoURL || "https://via.placeholder.com/150",
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const userLinks = [
        { name: "My Profile", path: "profile" },
        { name: "Add Product", path: "add-product" },
        { name: "My Products", path: "my-products" },
        { name: "Home", path: "/", icon: IoHome },
        { name: "Products", path: "/products", icon: AiOutlineAppstore },
    ];

    return (
        <DashboardLayout sidebarLinks={userLinks} title="User Dashboard">
            <div className="min-h-screen p-6 bg-gray-100 rounded-lg shadow-md">
                {user ? (
                    <>
                        <div className="flex items-center mb-4">
                            <img
                                src={user.image}
                                alt="User"
                                className="w-16 h-16 border-2 border-blue-500 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
                                <p className="text-gray-600">Manage your dashboard efficiently.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
                            <div className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg">
                                <h3 className="text-lg font-semibold">Total Products</h3>
                                <p className="text-2xl font-bold text-blue-500">10</p>
                            </div>
                            <div className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg">
                                <h3 className="text-lg font-semibold">Pending Orders</h3>
                                <p className="text-2xl font-bold text-yellow-500">2</p>
                            </div>
                            <div className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg">
                                <h3 className="text-lg font-semibold">Revenue</h3>
                                <p className="text-2xl font-bold text-green-500">$500</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-600">Loading user data...</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserDashboard;
