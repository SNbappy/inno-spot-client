import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get product ID from URL params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
                setProduct(response.data.product);
            } catch (err) {
                setError("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold">{product.productName}</h1>
            <div className="p-6 bg-white rounded-lg shadow">
                <img src={product.productImage} alt={product.productName} className="object-cover w-full h-64 mb-4 rounded-md" />
                <p className="mb-4">{product.description}</p>

                <div className="flex items-center mb-4 space-x-4">
                    <div>
                        <strong>Tags:</strong>
                        <ul>
                            {product.tags.map((tag, index) => (
                                <li key={index} className="text-blue-500">{tag}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <strong>Owner:</strong>
                        <p>{product.ownerInfo.name}</p>
                        <p>{product.ownerInfo.email}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <a href={product.externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Visit Product Link
                    </a>
                    <p className="text-sm text-gray-600">
                        Created At: {new Date(product.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
