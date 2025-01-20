import axios from "axios";

export const fetchUserRole = async (email) => {
    try {
        console.log("Fetching role for email:", email); // Debugging log
        const response = await axios.get(`http://localhost:5000/users/${email}`);
        console.log("Response from server:", response.data); // Debugging log
        if (response.data.success) {
            return response.data.user.role; // Return the role
        }
        throw new Error(response.data.message || "Failed to fetch user role.");
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null; // Return null on error
    }
};
