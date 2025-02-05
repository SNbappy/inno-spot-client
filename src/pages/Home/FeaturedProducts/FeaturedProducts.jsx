import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import ProductCard from "../../ProductCard/ProductCard";
import axios from "axios";
import Swal from "sweetalert2";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const auth = getAuth();

    // Fetch featured products
    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get("https://inno-spot-server.vercel.app/featured-products", {
                params: { limit: 4, sort: "desc" }, // Fetch latest featured products
            });

            // Optionally, you can sort the products on the frontend if necessary
            const sortedProducts = response.data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setProducts(sortedProducts); // Set sorted products
        } catch (error) {
            console.error("Error fetching featured products:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to load featured products. Please try again later.',
            });

        }
    };

    // Handle upvote functionality
    const handleVote = async (productId) => {
        const user = auth.currentUser;

        if (user) {
            try {
                const idToken = await user.getIdToken();
                const response = await axios.post(
                    "https://inno-spot-server.vercel.app/products/vote",
                    { productId },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                Swal.fire({
                    icon: 'success', // Use 'success' for upvote
                    title: response.data.message || "Upvote successful!",
                    showConfirmButton: false,
                    timer: 2000 // Auto-close after 2 seconds
                });

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId
                            ? {
                                ...product,
                                votesCount: response.data.votesCount,
                                votedUsers: [...product.votedUsers, user.email],
                            }
                            : product
                    )
                );
            } catch (error) {
                console.error("Error voting:", error.response?.data || error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error voting. Please try again.',
                    confirmButtonText: 'Okay'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You need to log in to vote.',
                confirmButtonText: 'Log In'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });

        }
    };

    useEffect(() => {
        fetchFeaturedProducts();
        const user = auth.currentUser;
        if (user) {
            setUserId(user.email);
        }
    }, []);

    return (
        <div className="p-4 md:p-8 bg-gray-50">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Featured Products</h2>
            {products.length === 0 ? (
                <div className="text-center text-gray-500">Loading featured products...</div>
            ) : (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <li key={product._id} className="transition-all transform hover:scale-105">
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

export default FeaturedProducts;
