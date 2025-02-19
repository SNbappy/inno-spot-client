// Footer.jsx
import React from "react";

const Footer = () => {
    return (
        <div className="text-gray-200 bg-gray-800">
            <footer className="max-w-[1250px] mx-auto">
                <div className="container py-8 mx-auto sm:px-6 lg:px-8 xl:px-0">
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                        {/* Logo and Website Name */}
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-2xl font-bold text-[#ff3366]">InnoSpot</h1>
                            <p className="text-sm text-gray-400">Your hub for innovation and discovery.</p>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-lg font-semibold text-gray-300">Contact Us</h2>
                            <p className="text-sm">Email: support@innospot.com</p>
                            <p className="text-sm">Phone: +1 (555) 123-4567</p>
                            <p className="text-sm">Address: 123 Innovation St, Tech City, USA</p>
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-300">Follow Us</h2>
                            <div className="flex mt-2 space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition hover:text-blue-600"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook fa-lg"></i>
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition hover:text-blue-400"
                                    aria-label="Twitter"
                                >
                                    <i className="fab fa-twitter fa-lg"></i>
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition hover:text-blue-700"
                                    aria-label="LinkedIn"
                                >
                                    <i className="fab fa-linkedin fa-lg"></i>
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition hover:text-pink-600"
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram fa-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-700"></div>

                    {/* Copyright */}
                    <div className="text-sm text-center text-gray-400">
                        &copy; {new Date().getFullYear()} InnoSpot. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
