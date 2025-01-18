import React, { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/firebase/firebase.config"; // Update the path as per your project structure

// Create the context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};

// Context provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user data
    const [loading, setLoading] = useState(true); // Tracks loading state

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user data to your app's structure
                const userData = {
                    uid: currentUser.uid,
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

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // Render a loading indicator while checking authentication
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="loader"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;