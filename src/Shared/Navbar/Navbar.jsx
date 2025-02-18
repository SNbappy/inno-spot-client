import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../pages/firebase/firebase.config";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
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
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-pink-500 text-white pt-8"}`}>
            <nav className="max-w-[1250px] mx-auto px-4 py-4 flex items-center justify-between md:px-6 lg:px-8">

                {/* Logo */}
                <Link to="/" className="flex items-center text-3xl font-bold">
                    <img className="w-10" src="/src/assets/Black & Blue Minimalist Modern Initial Font Logo.svg" alt="Logo" />
                    InnoSpot
                </Link>

                {/* Desktop Navigation */}
                <div className="items-center hidden space-x-6 md:flex">
                    <Link to="/" className="text-lg font-medium transition hover:text-blue-600">Home</Link>
                    <Link to="/" className="text-lg font-medium transition hover:text-blue-600">About</Link>
                    <Link to="/products" className="text-lg font-medium transition hover:text-blue-600">Products</Link>

                    {!user ? (
                        <Link to="/login" className="text-lg font-medium transition hover:text-blue-600">Login</Link>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            />

                            {dropdownVisible && (
                                <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                                    <div className="px-4 py-2 text-gray-700">{user.displayName || "User"}</div>
                                    <hr />
                                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownVisible(false)}>Dashboard</Link>
                                    <button
                                        onClick={() => {
                                            setDropdownVisible(false);
                                            handleLogout();
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contact Us Button */}
                    <Link to="/contact" className="bg-[#ff3366] text-white px-6 py-2 rounded-full transition hover:bg-red-600">
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute left-0 w-full bg-white shadow-md md:hidden">
                    <div className="flex flex-col items-center py-4">
                        <Link to="/" className="py-2 text-lg text-gray-700 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link to="/" className="py-2 text-lg text-gray-700 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link to="/products" className="py-2 text-lg text-gray-700 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Products</Link>

                        {!user ? (
                            <Link to="/login" className="py-2 text-lg text-gray-700 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                        ) : (
                            <>
                                <div className="text-lg text-gray-700">{user.displayName || "User"}</div>
                                <Link to="/dashboard" className="w-full py-2 text-lg text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full py-2 text-lg text-red-500 transition hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Contact Us Button (Mobile) */}
                        <Link to="/contact" className="mt-4 bg-[#ff3366] text-white px-6 py-2 rounded-full transition hover:bg-red-600">
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
