// ProductsPage Component
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null); // User's email as an identifier
    const auth = getAuth();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products", {
                params: {
                    page: 1,
                    limit: 6,
                    search: "",
                },
            });
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to load products. Please try again later.");
        }
    };

    const handleVote = async (productId) => {
        const user = auth.currentUser;

        if (user) {
            try {
                const idToken = await user.getIdToken();
                const response = await axios.post(
                    "http://localhost:5000/products/vote",
                    { productId },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                console.log("Vote successful:", response.data);
                alert(response.data.message);

                // Update the product's vote count in the frontend with the new count from the response
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId
                            ? { ...product, votesCount: response.data.votesCount } // Update with the new votesCount from the backend
                            : product
                    )
                );
            } catch (error) {
                console.error("Error voting:", error.response?.data || error.message);
                alert("Error voting. Please try again.");
            }
        } else {
            alert("You need to be logged in to vote.");
        }
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
            <h1 className="mb-4 text-2xl font-bold">Products</h1>
            {products.length === 0 ? (
                <p>Loading products...</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
    );
};

export default ProductsPage;