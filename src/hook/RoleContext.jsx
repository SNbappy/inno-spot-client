import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserRole } from "./fetchUsersRole";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [roleError, setRoleError] = useState(null); // Error state for role fetching

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("User logged in:", user.email); // Debugging log
                try {
                    const userRole = await fetchUserRole(user.email);
                    console.log("Fetched role from backend:", userRole); // Debugging log
                    setRole(userRole); // Set the role
                    setRoleError(null); // Reset any previous errors
                } catch (error) {
                    console.error("Error fetching role:", error); // Handle the error
                    setRoleError("Failed to fetch user role");
                    setRole(null); // Set role to null in case of error
                }
            } else {
                console.log("No user logged in."); // Debugging log
                setRole(null); // No user logged in, set role to null
            }
            setLoading(false);
        });
        return () => unsubscribe(); // Clean up the auth state listener
    }, []);

    return (
        <RoleContext.Provider value={{ role, loading, roleError }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
