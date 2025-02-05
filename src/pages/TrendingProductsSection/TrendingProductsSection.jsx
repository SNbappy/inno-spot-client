import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../context/UserContext";
import { auth } from "../firebase/firebase.config";
import ProductCard from "../ProductCard/ProductCard"; // Reuse the ProductCard component

const TrendingProductsSection = ({ isTrendingSection = true }) => { // Add isTrendingSection as a prop to decide sorting
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUserContext(); // Get user info from context

    // Fetch all products
    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                    params: {
                        limit: 10,
                        sortBy: "votesCount", // Pass 'votesCount' for sorting by votes in the trending section
                    },
                });

                let sortedProducts = response.data.products;

                // Limit to only the top 6 products
                setProducts(sortedProducts.slice(0, 6));
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch trending products.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, [isTrendingSection]);


    // Handle the Upvote action
    const handleVote = async (productId) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            Swal.fire({
                title: "Login Required",
                text: "You need to be logged in to vote.",
                icon: "warning",
                confirmButtonText: "Okay",
            });
            return;
        }

        try {
            const idToken = await currentUser.getIdToken();
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/products/vote`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay",
            });

            // Update the product state to reflect the new vote count
            setProducts((prevProducts) =>
                prevProducts
                    .map((product) =>
                        product._id === productId
                            ? {
                                ...product,
                                votesCount: response.data.votesCount,
                                // Ensure votedUsers is an array before updating
                                votedUsers: Array.isArray(product.votedUsers)
                                    ? [...product.votedUsers, currentUser.email]
                                    : [currentUser.email], // If it's not an array, initialize it as one
                            }
                            : product
                    )
                    .sort((a, b) => b.votesCount - a.votesCount) // Sort again after the vote (only for trending section)
                    .slice(0, 6) // Keep only the top 6 products
            );
        } catch (error) {
            console.error("Error voting:", error);
            Swal.fire({
                title: "Error!",
                text: "Error voting. Please try again.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    // Handle loading and error states
    if (loading) return <div className="text-center text-gray-500">Loading trending products...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 md:p-8 bg-gray-50">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                {isTrendingSection ? "Trending Products" : "New Arrivals"}
            </h2>
            {products.length === 0 ? (
                <div className="text-center text-gray-500">No products found.</div>
            ) : (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <li key={product._id} className="transition-all transform hover:scale-105">
                            <ProductCard
                                product={product}
                                userId={user?.email}
                                handleVote={handleVote}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TrendingProductsSection;
