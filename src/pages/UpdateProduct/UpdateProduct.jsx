import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert2

const UpdateProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        tags: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch product details by ID
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                if (response.data.success) {
                    setProduct({
                        productName: response.data.product.productName,
                        description: response.data.product.description,
                        tags: response.data.product.tags.join(", "),
                    });
                } else {
                    setError("Failed to fetch product details.");
                }
            } catch (error) {
                setError("Error fetching product details. Please try again.");
                console.error("Error fetching product:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure tags are a comma-separated string
        const tagsString = product.tags.split(",").map(tag => tag.trim()).join(", ");

        try {
            const response = await axios.put(
                `http://localhost:5000/update-product/${id}`,
                {
                    productName: product.productName,
                    description: product.description,
                    tags: tagsString, // Send tags as a string
                }
            );

            if (response.data.success) {
                // SweetAlert for success
                Swal.fire({
                    title: "Success!",
                    text: "Product updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate("/dashboard/my-products");
            } else {
                // SweetAlert for error (backend error)
                Swal.fire({
                    title: "Error!",
                    text: response.data.error || "Failed to update product.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            }
        } catch (error) {
            // SweetAlert for error (network or other error)
            Swal.fire({
                title: "Error!",
                text: "There was an error updating the product. Please try again.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="update-product">
            <h1 className="mb-4 text-xl font-bold">Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tags (comma-separated):</label>
                    <input
                        type="text"
                        name="tags"
                        value={product.tags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
