import React, { useState, useEffect } from "react";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [ownerInfo, setOwnerInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setOwnerInfo({
                    name: user.displayName || "Anonymous User",
                    image: user.photoURL || "https://via.placeholder.com/150",
                    email: user.email,
                });
            } else {
                setOwnerInfo(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Product Name:", productName);
        console.log("Product Image:", productImage);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("Owner Info:", ownerInfo);

        if (!productName || !productImage || !description || tags.length === 0 || !ownerInfo) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productImage", productImage);
        formData.append("description", description);
        formData.append("tags", JSON.stringify(tags));
        formData.append("ownerInfo", JSON.stringify(ownerInfo));

        try {
            setIsSubmitting(true);

            const response = await axios.post(
                "http://localhost:5000/add-product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                alert("Product added successfully!");
                setProductName("");
                setProductImage(null);
                setImagePreview(null);
                setDescription("");
                setTags([]);
            } else {
                alert("Failed to add the product. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("An error occurred while adding the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold">Add Product</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                {imagePreview && (
                    <div className="mt-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 rounded"
                        />
                    </div>
                )}
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <TagsInput
                    value={tags}
                    onChange={(updatedTags) => {
                        console.log("Updated Tags:", updatedTags); // Debugging
                        setTags(updatedTags); // Ensure state is updated with tags
                    }}
                    name="tags"
                    placeHolder="Enter Tags"
                />
                {tags.length === 0 && (
                    <p className="text-red-500">Please add at least one tag.</p>
                )}
                {ownerInfo ? (
                    <div className="flex items-center mt-4">
                        <img
                            src={ownerInfo.image}
                            alt="Owner"
                            className="w-12 h-12 mr-4 rounded-full"
                        />
                        <div>
                            <p>{ownerInfo.name}</p>
                            <p>{ownerInfo.email}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">User not logged in.</p>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
                    disabled={!ownerInfo || isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
