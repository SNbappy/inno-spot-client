import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";

// ProductCard component to display individual product details
const ProductCard = ({ product, userId, handleVote }) => {
    const votedUsers = product?.votedUsers || [];
    const hasUserVoted = votedUsers.includes(userId);
    const isProductOwner = userId === product?.ownerEmail;

    return (
        <div className="p-4 border rounded shadow-md">
            <img
                src={product?.productImage || "https://via.placeholder.com/150"}
                alt={product?.productName || "No Name"}
                className="object-cover w-full h-48 mb-4 rounded"
            />
            <h2 className="text-lg font-bold text-gray-800">{product?.productName || "Unnamed Product"}</h2>
            <p className="text-sm text-gray-600">{product?.description || "No description available"}</p>
            <button
                onClick={() => handleVote(product?._id)}
                disabled={isProductOwner || hasUserVoted}
                className={`px-4 py-2 mt-2 rounded transition-all ${isProductOwner || hasUserVoted
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
            >
                {hasUserVoted ? "Voted" : "Upvote"} 👍 {product?.votes?.length || 0}
            </button>
        </div>
    );
};

// Main ProductsPage component
const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null); // User's email as an identifier
    const auth = getAuth();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products", {
                params: {
                    page: 1,
                    limit: 6,
                    search: "",
                },
            });
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to load products. Please try again later.");
        }
    };

    const handleVote = async (productId) => {
        const user = auth.currentUser;

        if (user) {
            try {
                const idToken = await user.getIdToken();
                const response = await axios.post(
                    "http://localhost:5000/products/vote",
                    { productId },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                console.log("Vote successful:", response.data);
                alert(response.data.message);
                fetchProducts();
            } catch (error) {
                console.error("Error voting:", error.response?.data || error.message);
                alert("Error voting. Please try again.");
            }
        } else {
            alert("You need to be logged in to vote.");
        }
    };

    useEffect(() => {
        fetchProducts();

        const user = auth.currentUser;
        if (user) {
            setUserId(user.email);
        }
    }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Products</h1>
            {products.length === 0 ? (
                <p>Loading products...</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <li key={product._id}>
                            <ProductCard
                                product={product}
                                userId={userId}
                                handleVote={handleVote}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductsPage;
