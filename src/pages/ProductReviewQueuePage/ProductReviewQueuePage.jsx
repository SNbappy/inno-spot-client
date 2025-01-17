import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductReviewQueuePage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all products from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
                const sortedProducts = response.data.products.sort((a, b) =>
                    a.status === "Pending" ? -1 : b.status === "Pending" ? 1 : 0
                );
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const updateProductStatus = async (id, status) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-product/${id}`, { status });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, status } : product
                )
            );
        } catch (error) {
            console.error(`Error updating product status to ${status}:`, error);
        }
    };

    const markAsFeatured = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-product/${id}`, { isFeatured: true });
            alert("Product marked as featured!");
        } catch (error) {
            console.error("Error marking product as featured:", error);
        }
    };

    const navigateToDetails = (id) => {
        navigate(`/dashboard/product-details/${id}`);
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold">Product Review Queue</h1>
            <table className="w-full bg-white rounded-lg shadow table-auto">
                <thead>
                    <tr className="text-gray-600 bg-gray-200">
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="px-4 py-2">{product.productName}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => navigateToDetails(product._id)}
                                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => markAsFeatured(product._id)}
                                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                >
                                    Make Featured
                                </button>
                                <button
                                    onClick={() => updateProductStatus(product._id, "Accepted")}
                                    disabled={product.status === "Accepted"}
                                    className={`px-3 py-1 text-sm rounded ${product.status === "Accepted"
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => updateProductStatus(product._id, "Rejected")}
                                    disabled={product.status === "Rejected"}
                                    className={`px-3 py-1 text-sm rounded ${product.status === "Rejected"
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductReviewQueuePage;
