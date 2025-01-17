import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportedContentsPage = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all reported products
        const fetchReportedProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reported-products`);
                setReportedProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching reported products:', error);
            }
        };
        fetchReportedProducts();
    }, []);

    const navigateToDetails = (id) => {
        navigate(`/product-details/${id}`);
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-product/${id}`);
            setReportedProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold">Reported Products</h1>
            <table className="w-full bg-white rounded-lg shadow table-auto">
                <thead>
                    <tr className="text-gray-600 bg-gray-200">
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedProducts.map((product) => (
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
                                    onClick={() => deleteProduct(product._id)}
                                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedContentsPage;
