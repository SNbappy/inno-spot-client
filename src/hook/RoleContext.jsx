import React, { createContext, useContext, useState, useEffect } from "react";
// import { fetchUserRole } from "./utils/fetchUserRole"; // Import the utility function
import { getAuth } from "firebase/auth";
import { fetchUserRole } from "./fetchUsersRole";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("User logged in:", user.email); // Debugging log
                const userRole = await fetchUserRole(user.email);
                console.log("Fetched role from backend:", userRole); // Debugging log
                setRole(userRole); // Set the role
            } else {
                console.log("No user logged in."); // Debugging log
            }
            setLoading(false);
        });
        return () => unsubscribe(); // Clean up
    }, []);

    return (
        <RoleContext.Provider value={{ role, loading }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
