import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../pages/firebase/firebase.config";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const closeDropdown = () => setDropdownVisible(false);

    if (loading) return null;

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
                {/* Logo / Website Name */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    InnoSpot
                </Link>

                {/* Desktop Navigation Links */}
                <div className="items-center hidden space-x-6 md:flex">
                    <Link
                        to="/"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        Products
                    </Link>
                    {!user ? (
                        <Link
                            to="/login"
                            className="font-medium text-gray-700 transition hover:text-blue-600"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            {/* User Profile Picture */}
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => setDropdownVisible((prev) => !prev)}
                            />

                            {/* Dropdown Menu */}
                            {dropdownVisible && (
                                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                                    <div
                                        className="px-4 py-2 font-medium text-gray-700"
                                        onClick={closeDropdown}
                                    >
                                        {user.displayName || "User"}
                                    </div>
                                    <hr />
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                                        onClick={closeDropdown}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            closeDropdown();
                                            handleLogout();
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute left-0 w-full bg-white shadow-md md:hidden">
                    <div className="flex flex-col items-center py-4">
                        <Link
                            to="/"
                            className="py-2 text-lg text-gray-700 transition hover:text-blue-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="py-2 text-lg text-gray-700 transition hover:text-blue-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Products
                        </Link>
                        {!user ? (
                            <Link
                                to="/login"
                                className="py-2 text-lg text-gray-700 transition hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="text-lg text-center text-gray-700">
                                <div className="text-center">
                                    {user.displayName || "User"}
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full text-red-500 transition hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;