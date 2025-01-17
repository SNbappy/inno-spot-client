import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="font-extrabold tracking-widest text-blue-500 text-9xl">404</h1>
                <div className="absolute px-2 text-sm text-white bg-blue-500 rounded rotate-12">
                    Page Not Found
                </div>
                <p className="mt-8 text-lg text-gray-600">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="px-6 py-2 text-white transition bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        Back to Home
                    </Link>
                </div>
                {/*  */}
            </div>
        </div>
    );
};

export default NotFoundPage;
