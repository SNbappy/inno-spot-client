import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config"; // Update the path as per your file structure
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photoURL: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, photoURL } = formData;

        // Password regex check
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check if required fields are missing
        if (!name || !email || !password) {
            setError("Please fill out all required fields.");
            return;
        }

        // Validate password format
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with name and photoURL
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL || null,
            });

            // console.log("User registered:", userCredential.user);

            // Send user data to the backend
            const response = await fetch("https://inno-spot-server.vercel.app/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    photoURL: photoURL || null,
                }),
            });

            // Check if response from backend is successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save user data in the database");
            }

            // Navigate after successful registration
            navigate("/dashboard");
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message); // Show specific error message
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-3xl font-bold text-center text-blue-500">
                    Register to InnoSpot
                </h2>
                {error && <p className="mb-4 text-center text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div>
                        <label htmlFor="photoURL" className="block font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoURL"
                            name="photoURL"
                            placeholder="Photo URL (optional)"
                            value={formData.photoURL}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white font-semibold rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            } transition`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Link to Login Page */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log in here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;