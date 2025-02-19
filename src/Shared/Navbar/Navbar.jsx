import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../pages/firebase/firebase.config";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    if (loading) return null;

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 dark:text-black ${isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent text-white dark:text-gray-200"}`}>
            <nav className="max-w-[1250px] mx-auto px-4 py-4 flex items-center justify-between md:px-6 lg:px-8 xl:px-0">
                <Link to="/" className="flex items-center text-3xl font-bold">
                    <img className="w-10" src="/src/assets/Black & Blue Minimalist Modern Initial Font Logo.svg" alt="Logo" />
                    InnoSpot
                </Link>

                <div className="items-center hidden space-x-6 md:flex">
                    <Link to="/" className="text-lg font-medium transition hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                    <Link to="/about" className="text-lg font-medium transition hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                    <Link to="/products" className="text-lg font-medium transition hover:text-blue-600 dark:hover:text-blue-400">Products</Link>

                    {!user ? (
                        <Link to="/login" className="text-lg font-medium transition hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            />

                            {dropdownVisible && (
                                <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg dark:bg-gray-800">
                                    <div className="px-4 py-2 text-gray-700 dark:text-gray-300">{user.displayName || "User"}</div>
                                    <hr />
                                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setDropdownVisible(false)}>Dashboard</Link>
                                    <button
                                        onClick={() => {
                                            setDropdownVisible(false);
                                            handleLogout();
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-lg font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>

                    <Link to="/contact" className="bg-[#ff3366] text-white px-6 py-2 rounded-full transition hover:bg-red-600 text-lg font-bold">
                        Contact Us
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
