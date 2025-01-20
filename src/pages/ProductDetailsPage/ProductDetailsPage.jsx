import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2"; // Import Swal for alerts
import { auth } from "../firebase/firebase.config";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get product ID from URL params
    const { user } = useUserContext(); // Get user info from context
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [upvoted, setUpvoted] = useState(false); // Track if the user has voted
    const [reviewDescription, setReviewDescription] = useState(""); // Track review description
    const [rating, setRating] = useState(1); // Track rating

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
                setProduct(response.data.product);
                setUpvoted(response.data.product.votedUsers.includes(user?.id)); // Set upvoted state
            } catch (err) {
                setError("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id, user?.id]);

    const handleVote = async (productId) => {
        const user = auth.currentUser; // Get current user

        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to be logged in to vote.',
                icon: 'warning',
                confirmButtonText: 'Okay',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to upvote this product!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, upvote!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const idToken = await user.getIdToken();  // Retrieve ID Token

                    const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/products/vote`,
                        { productId },
                        {
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    );

                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });

                    // Update product state with new vote count
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        votesCount: response.data.votesCount,
                        votedUsers: [...prevProduct.votedUsers, user.email],
                    }));
                } catch (error) {
                    console.error('Error voting:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error voting. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            }
        });
    };




    // Define the handleReport function
    const handleReport = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to report this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Report!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Call backend API to report the product
                Swal.fire({
                    title: 'Reported!',
                    text: 'This product has been reported successfully.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
            }
        });
    };



    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!reviewDescription || !rating) {
            Swal.fire({
                title: 'Error!',
                text: 'Please provide both a review and a rating.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        try {
            const idToken = await user.getIdToken();
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/products/review`,
                { productId: id, description: reviewDescription, rating },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );

            Swal.fire({
                title: 'Success!',
                text: 'Your review has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'Okay',
            });

            // Update product reviews in the state
            setProduct((prevProduct) => ({
                ...prevProduct,
                reviews: [...prevProduct.reviews, response.data.review],
            }));

            // Clear review form
            setReviewDescription("");
            setRating(1);
        } catch (error) {
            console.error("Error submitting review:", error.response?.data || error.message);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error submitting your review. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    // Check if the product is loaded and handle loading/error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found.</div>;

    const isProductOwner = user?.email === product?.ownerInfo?.email;
    const hasUserVoted = upvoted || product?.votedUsers.includes(user?.email);

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

                {/* Upvote Button */}
                <button
                    onClick={() => handleVote(product?._id)}
                    disabled={isProductOwner || hasUserVoted}
                    className={`px-4 py-2 mt-2 flex items-center gap-2 rounded transition-all ${isProductOwner || hasUserVoted
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    {hasUserVoted ? "Voted" : "Upvote"}
                    <span>👍</span>
                    <span>{product?.votesCount || 0}</span>
                </button>

                {/* Report Button */}
                <button onClick={handleReport} className="p-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600">
                    Report Product
                </button>

                {/* Reviews Section */}
                <div className="mt-6">
                    <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
                    {product.reviews?.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                    ) : (
                        product.reviews?.map((review, index) => (
                            <div key={index} className="p-4 mb-4 rounded-md shadow-sm bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <img src={review.reviewerImage || "https://via.placeholder.com/40"} alt={review.reviewerName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{review.reviewerName}</p>
                                        <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="mt-2">{review.description}</p>
                                <p className="mt-2 font-semibold">Rating: {review.rating}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Post Review Section */}
                <div className="mt-6">
                    <h2 className="mb-4 text-xl font-semibold">Post a Review</h2>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                value={user.name} // Get name from user context
                                readOnly
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Your Photo</label>
                            <input
                                type="text"
                                value={user.image} // Get image from user context
                                readOnly
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Review Description</label>
                            <textarea
                                value={reviewDescription}
                                onChange={(e) => setReviewDescription(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Rating</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
