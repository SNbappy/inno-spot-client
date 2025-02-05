import axios from "axios";

export const fetchUserRole = async (email) => {
    try {
        const encodedEmail = encodeURIComponent(email); // Encode the email
        const response = await axios.get(`https://inno-spot-server.vercel.app/users/${encodedEmail}`);

        // Check if the response contains the role
        if (response.data && response.data.role) {
            return response.data.role; // Return the role directly
        }

        // Handle case where role is not found
        throw new Error("Role not found in response.");
    } catch (error) {
        if (error.response) {
            console.error("Error fetching user role:", error.response.data);
        } else if (error.request) {
            console.error("Error fetching user role: No response from server.");
        } else {
            console.error("Error fetching user role:", error.message);
        }
        return null; // Return null on error
    }
};
