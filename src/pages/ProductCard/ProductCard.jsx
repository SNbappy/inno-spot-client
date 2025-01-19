const ProductCard = ({ product, userId, handleVote }) => {
    const votedUsers = product?.votedUsers || [];
    const hasUserVoted = votedUsers.includes(userId);
    const isProductOwner = userId === product?.ownerEmail;

    return (
        <div className="p-4 border rounded shadow-md">
            <img
                src={product?.productImage || "https://via.placeholder.com/150"}
                alt={product?.productName || "No Name"}
                className="object-cover w-full h-48 mb-4 rounded"
            />
            <h2 className="text-lg font-bold text-gray-800">{product?.productName || "Unnamed Product"}</h2>
            <p className="text-sm text-gray-600">{product?.description || "No description available"}</p>
            <button
                onClick={() => handleVote(product?._id)}
                disabled={isProductOwner || hasUserVoted}
                className={`px-4 py-2 mt-2 rounded transition-all ${isProductOwner || hasUserVoted
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
            >
                {hasUserVoted ? "Voted" : "Upvote"} 👍 {product?.votesCount || 0} {/* Display updated votes count */}
            </button>
        </div>
    );
};

export default ProductCard;