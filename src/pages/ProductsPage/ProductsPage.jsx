import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import ProductCard from "../ProductCard/ProductCard";
import Swal from 'sweetalert2';
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const auth = getAuth();
    const PRODUCTS_PER_PAGE = 6;

    // Fetch products with search and pagination
    const fetchProducts = async (page = 1, search = "") => {
        try {
            const response = await axios.get("https://inno-spot-server.vercel.app/products", {
                params: { page, limit: PRODUCTS_PER_PAGE, search },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages || 1); // Total pages from backend
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to load products. Please try again later.");
        }
    };

    const handleVote = async (productId) => {
        const user = auth.currentUser;

        if (user) {
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

                        // console.log("Vote successful:", response.data);
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                        });

                        // Update the product without causing navigation issues
                        setProducts((prevProducts) =>
                            prevProducts.map((product) =>
                                product._id === productId
                                    ? {
                                        ...product,
                                        votesCount: response.data.votesCount,
                                        votedUsers: Array.isArray(product.votedUsers)
                                            ? [...product.votedUsers, user.email] // Ensure votedUsers is an array
                                            : [user.email], // Fallback to an array if not already
                                    }
                                    : product
                            )
                        );
                    } catch (error) {
                        console.error("Error voting:", error.response?.data || error.message);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Error voting. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Try Again',
                        });
                    }
                }
            });
        } else {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to be logged in to vote.',
                icon: 'warning',
                confirmButtonText: 'Okay',
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(1, searchTerm);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchProducts(page, searchTerm);
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
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-2 border rounded-l-md"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {/* Products Grid */}
            {products.length === 0 ? (
                <p>Loading products...</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;