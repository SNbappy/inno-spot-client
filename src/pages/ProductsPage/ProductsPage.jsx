import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (page = 1, search = '') => {
        try {
            const response = await axios.get('http://localhost:5000/products', {
                params: { page, search },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(1, searchTerm); // Reset to page 1 when searching
    };

    return (
        <div className="container p-4 mx-auto">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by tags..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="p-4 transition border rounded-lg shadow-md hover:shadow-lg"
                    >
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="object-cover w-full h-48 rounded-t-md"
                        />
                        <h3 className="mt-2 text-xl font-bold">{product.productName}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="mt-1 text-sm text-blue-500">
                            Tags: {product.tags.join(', ')}
                        </p>
                        <a
                            href={product.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-blue-600 underline"
                        >
                            Learn More
                        </a>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
                <button
                    className="px-3 py-1 border rounded-md"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 border rounded-md"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
