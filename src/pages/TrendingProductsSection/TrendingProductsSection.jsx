import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserContext } from "../../context/UserContext";
import { auth } from "../firebase/firebase.config";

const TrendingProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUserContext(); // Get user info from context
    const navigate = useNavigate();

    // Fetch trending products from backend
    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
                // Sort products by vote count in descending order
                const sortedProducts = response.data.products.sort((a, b) => b.votesCount - a.votesCount);
                setProducts(sortedProducts.slice(0, 6)); // Take the top 6 products
            } catch (err) {
                setError("Failed to fetch trending products.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, []);

    // Handle the Upvote action
    const handleVote = async (productId) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to be logged in to vote.',
                icon: 'warning',
                confirmButtonText: 'Okay',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to upvote this product!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, upvote!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
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
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });

                    // Update the product state
                    setProducts(prevProducts =>
                        prevProducts.map(product =>
                            product._id === productId
                                ? { ...product, votesCount: response.data.votesCount, votedUsers: [...product.votedUsers, currentUser.email] }
                                : product
                        )
                    );
                } catch (error) {
                    console.error('Error voting:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error voting. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            }
        });
    };

    // Redirect to all products page
    const handleShowAllClick = () => {
        navigate('/products');
    };

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="mb-6 text-2xl font-bold">Trending Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {products.map(product => (
                    <div key={product._id} className="p-4 bg-white rounded-lg shadow-md">
                        <img src={product.productImage} alt={product.productName} className="object-cover w-full h-64 mb-4 rounded-md" />
                        <h3 className="mb-2 text-xl font-semibold">{product.productName}</h3>
                        <p className="mb-2 text-sm text-gray-600">{product.description}</p>

                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => handleVote(product._id)}
                                disabled={product.votedUsers.includes(user?.email)}
                                className={`px-4 py-2 rounded bg-blue-500 text-white ${product.votedUsers.includes(user?.email) ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-blue-600'}`}
                            >
                                {product.votedUsers.includes(user?.email) ? 'Voted' : 'Upvote'} 👍
                            </button>
                            <span>{product.votesCount} votes</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Owner: {product.ownerInfo?.name}</p>
                            <a
                                href={product.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 underline"
                            >
                                View Product
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleShowAllClick}
                    className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Show All Products
                </button>
            </div>
        </div>
    );
};

export default TrendingProductsSection;
