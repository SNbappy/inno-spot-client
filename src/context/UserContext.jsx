import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/firebase/firebase.config";
// import { auth } from "../firebase"; // Import your Firebase auth instance

// Create the context
const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initially, no user is logged in
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user data to your app's structure
                const userData = {
                    name: currentUser.displayName || "Anonymous",
                    email: currentUser.email,
                    image: currentUser.photoURL || "https://via.placeholder.com/150",
                };
                setUser(userData);
            } else {
                setUser(null); // No user is signed in
            }
            setLoading(false); // Loading complete
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can add a spinner here
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
