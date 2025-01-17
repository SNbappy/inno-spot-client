import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";

const AddProductPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Assumes user data is stored in context

    // State variables
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [externalLink, setExternalLink] = useState("");

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    // Tag handlers
    const handleTagDelete = (i) => {
        setTags(tags.filter((_, index) => index !== i));
    };

    const handleTagAddition = (tag) => {
        setTags([...tags, tag]);
    };

    // Image upload handler
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
    };

    // Form submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!productName || !productImage || !description || tags.length === 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Prepare image data for ImgBB upload
            const formData = new FormData();
            formData.append("image", productImage);

            const imageUploadResponse = await axios.post(
                "https://api.imgbb.com/1/upload",
                formData,
                {
                    params: {
                        key: "24baa728d298bbb9d014b2a241a98e99", // Replace with actual API key
                    },
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (imageUploadResponse.data.success) {
                const productData = {
                    productName,
                    productImage: imageUploadResponse.data.data.url, // ImgBB URL
                    description,
                    ownerInfo: {
                        name: user.name,
                        image: user.image,
                        email: user.email,
                    },
                    tags: tags.map((tag) => tag.text),
                    externalLink,
                };

                // Save product data to backend
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/add-product`,
                    productData
                );

                toast.success("Product added successfully!");
                navigate("/dashboard/my-products");
            } else {
                toast.error("Image upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-md">
            <h1 className="mb-4 text-2xl font-bold">Add Product</h1>
            <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                    <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                        Product Image
                    </label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleTagDelete}
                        handleAddition={handleTagAddition}
                        delimiters={delimiters}
                        classNames={{
                            tags: "tags-input",
                            tagInputField: "w-full px-3 py-2 border rounded-md focus:outline-none",
                        }}
                    />
                </div>

                {/* External Link */}
                <div className="mb-4">
                    <label htmlFor="externalLink" className="block text-sm font-medium text-gray-700">
                        External Link
                    </label>
                    <input
                        type="url"
                        id="externalLink"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                </div>

                {/* Owner Info */}
                <div className="mb-4">
                    <h2 className="text-lg font-medium">Owner Info</h2>
                    <p className="text-gray-700">Name: {user.name}</p>
                    <p className="text-gray-700">Email: {user.email}</p>
                    <img src={user.image} alt="Owner" className="w-16 h-16 mt-2 rounded-full" />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
