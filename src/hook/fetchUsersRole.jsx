import axios from "axios";

export const fetchUserRole = async (email) => {
    try {
        console.log("Fetching role for email:", email); // Debugging log
        const response = await axios.get(`http://localhost:5000/users/${email}`);
        console.log("Response from server:", response.data); // Debugging log

        // Check if the response contains the role
        if (response.data && response.data.role) {
            return response.data.role; // Return the role directly
        }

        // Handle case where role is not found
        throw new Error("Role not found in response.");
    } catch (error) {
        console.error("Error fetching user role:", error.message); // Log error message
        return null; // Return null on error
    }
};
