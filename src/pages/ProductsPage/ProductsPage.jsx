import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import ProductCard from "../ProductCard/ProductCard";
import Swal from "sweetalert2";
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [votedProducts, setVotedProducts] = useState([]);
    const [sortBy, setSortBy] = useState("createdAt");
    const auth = getAuth();
    const PRODUCTS_PER_PAGE = 6;

    const fetchProducts = async (page = 1, search = "", sortBy = "createdAt") => {
        try {
            const response = await axios.get("https://inno-spot-server.vercel.app/products", {
                params: { page, limit: PRODUCTS_PER_PAGE, search, sortBy },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching products:", error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to load products. Please try again later.",
                confirmButtonText: "Okay",
            });
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        fetchProducts(1, searchTerm, e.target.value);
    };

    useEffect(() => {
        fetchProducts(currentPage, searchTerm, sortBy);
        const user = auth.currentUser;
        if (user) {
            setUserId(user.email);
        }
    }, [currentPage, searchTerm, sortBy]);

    return (
        <div className="pt-28 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 mb-20">
            {/* <h1 className="mb-6 text-3xl font-bold text-center">Discover Innovative Products</h1> */}

            <h2 className='pb-5 text-4xl font-bold text-center uppercase '>Discover Innovative Products</h2>
            <p className='pb-10 text-xl font-semibold text-center'>Discover, Explore, and Connect with the Latest and Greatest in Technology</p>

            {/* Search and Sort Controls */}
            <div className="justify-between mb-4 sm:flex">
                <form onSubmit={(e) => { e.preventDefault(); fetchProducts(1, searchTerm, sortBy); }} className="flex">
                    <input
                        type="text"
                        placeholder="Search by tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-2 border rounded-l-md"
                    />
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600">
                        Search
                    </button>
                </form>
                <select value={sortBy} onChange={handleSortChange} className="p-2 border rounded">
                    <option value="createdAt">Newest</option>
                    <option value="votesCount">Most Voted</option>
                    <option value="name">Alphabetical</option>
                </select>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <p>{searchTerm ? "No products found." : "Loading products..."}</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {products.map((product) => (
                        <li key={product._id}>
                            <ProductCard
                                product={product}
                                userId={userId}
                                handleVote={() => handleVote(product._id)}
                                isVoted={votedProducts.includes(product._id)}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 pt-14">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
