import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, userId, handleVote }) => {
    const navigate = useNavigate();
    const votedUsers = product?.votedUsers || [];
    const hasUserVoted = votedUsers.includes(userId); // Check if user has voted
    const isProductOwner = userId === product?.ownerEmail;

    return (
        <div className="p-4 bg-white border rounded shadow-md">
            {/* Product Image */}
            <img
                src={product?.productImage || "https://via.placeholder.com/150"}
                alt={product?.productName || "No Name"}
                className="object-cover w-full h-48 mb-4 rounded"
            />

            {/* Product Name */}
            <h2
                className="text-lg font-bold cursor-pointer text-[#ff3366] hover:underline"
                onClick={() => navigate(`/product-details/${product._id}`)} // Redirect to product details
            >
                {product?.productName || "Unnamed Product"}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-2">
                {product?.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-xs text-white bg-gray-600 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Upvote Button */}
            <button
                onClick={() => handleVote(product?._id)} // Make sure this is just an onClick handler
                disabled={isProductOwner || hasUserVoted}
                className={`px-4 py-2 mt-2 flex items-center gap-2 rounded transition-all ${isProductOwner || hasUserVoted
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#ff3366] text-white hover:bg-[#ff5588]"
                    }`}
            >
                {hasUserVoted ? "Voted" : "Upvote"}
                <span>👍</span>
                <span>{product?.votesCount || 0}</span>
            </button>

        </div>
    );
};


export default ProductCard;