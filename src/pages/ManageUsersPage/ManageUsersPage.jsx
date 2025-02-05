import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all users from the backend
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://inno-spot-server.vercel.app/users");
                setUsers(response.data.users);
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Function to update user role
    const updateUserRole = async (userId, role) => {
        try {
            await axios.patch(`https://inno-spot-server.vercel.app/users/${userId}`, { role });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role } : user
                )
            );
            Swal.fire({
                icon: 'success',
                title: 'Role Updated',
                text: `User role updated to ${role}.`,
                confirmButtonText: 'Okay'
            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update user role.',
                confirmButtonText: 'Try Again'
            });

        }
    };

    if (loading) return <div className="mt-8 text-center">Loading...</div>;
    if (error) return <div className="mt-8 text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold text-center">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md table-auto">
                    <thead className="text-white bg-blue-500">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center border-b">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => updateUserRole(user._id, "moderator")}
                                        className="px-3 py-1 mr-2 text-white transition bg-green-500 rounded hover:bg-green-600"
                                        disabled={user.role === "moderator"}
                                    >
                                        {user.role === "moderator" ? "Moderator" : "Make Moderator"}
                                    </button>
                                    <button
                                        onClick={() => updateUserRole(user._id, "admin")}
                                        className="px-3 py-1 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                                        disabled={user.role === "admin"}
                                    >
                                        {user.role === "admin" ? "Admin" : "Make Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;
