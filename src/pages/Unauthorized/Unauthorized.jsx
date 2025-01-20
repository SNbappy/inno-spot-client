import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-8 text-center bg-white rounded shadow-md">
                <h2 className="mb-4 text-3xl font-bold text-red-500">Unauthorized Access</h2>
                <p className="mb-4 text-lg text-gray-600">
                    Sorry, you don't have permission to access this page.
                </p>
                <p className="mb-6 text-gray-500 text-md">
                    If you believe this is a mistake, please contact the admin.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
