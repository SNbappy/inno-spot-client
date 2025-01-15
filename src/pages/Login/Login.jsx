import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { auth, googleProvider } from "./firebaseConfig"; // Import Firebase auth methods
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../firebase/firebase.config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Email and Password Authentication
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // Redirect to the dashboard or home page after login
        } catch (err) {
            setError("Failed to log in. Please check your credentials.");
        }
    };

    // Google Sign-In
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/dashboard"); // Redirect to the dashboard after successful login
        } catch (err) {
            setError("Failed to log in with Google. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                {/* Email & Password Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <div className="my-4 text-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 mt-4"
                    >
                        <FaGoogle />
                        Sign in with Google
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
