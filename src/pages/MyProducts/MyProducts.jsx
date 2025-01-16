import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null); // State to hold user email
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Firebase auth state listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email); // Set user email once user is logged in
            } else {
                setUserEmail(null); // Reset user email if no user is logged in
            }
        });

        return () => {
            unsubscribe(); // Clean up the listener on unmount
        };
    }, [auth]);

    useEffect(() => {
        if (!userEmail) {
            console.error("User email is not available.");
            setLoading(false);
            return;
        }

        // Fetch products if user email is available
        const fetchMyProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/my-products?email=${userEmail}`);
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    console.error("Error fetching products:", response.data.message || response.data.error);
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyProducts();
    }, [userEmail]); // Trigger fetch when userEmail changes

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete-product/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/update-product/${id}`); // Navigate to the update page
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="my-products">
            <h1 className="mb-4 text-xl font-bold">My Products</h1>
            {products.length > 0 ? (
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Votes</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="px-4 py-2 border">{product.productName}</td>
                                <td className="px-4 py-2 border">0</td>
                                <td className="px-4 py-2 border">Pending</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="mr-2 text-blue-500"
                                        onClick={() => handleUpdate(product._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="text-red-500"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default MyProducts;
