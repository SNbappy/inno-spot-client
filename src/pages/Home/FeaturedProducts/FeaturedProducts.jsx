import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false); // Replace this with real auth logic
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data from an API
        fetch("/featured.json") // Adjust the path if needed
            .then((response) => response.json())
            .then((data) => {
                const sortedProducts = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setProducts(sortedProducts);
            });
    }, []);

    const handleUpvote = (productId) => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, upvotes: product.upvotes + 1 }
                    : product
            )
        );
    };

    return (
        <div className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3
                                    className="text-xl font-semibold text-gray-800 hover:text-blue-500 cursor-pointer"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    {product.tags.join(", ")}
                                </p>
                                <button
                                    className={`flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-white ${loggedIn && product.ownerId === "user123"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    onClick={() =>
                                        product.ownerId !== "user123" &&
                                        handleUpvote(product.id)
                                    }
                                    disabled={
                                        loggedIn && product.ownerId === "user123"
                                    }
                                >
                                    <FaArrowUp />
                                    {product.upvotes}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
