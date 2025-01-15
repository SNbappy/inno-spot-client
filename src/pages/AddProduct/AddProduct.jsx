import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [ownerInfo] = useState({
        name: "John Doe",
        image: "https://via.placeholder.com/150",
        email: "johndoe@example.com",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            productName,
            productImage,
            description,
            tags,
            ownerInfo,
        });
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
                    onChange={(e) => setProductImage(e.target.files[0])}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="tags"
                    placeHolder="Enter Tags"
                />
                <div className="flex items-center mt-4">
                    <img src={ownerInfo.image} alt="Owner" className="w-12 h-12 mr-4 rounded-full" />
                    <div>
                        <p>{ownerInfo.name}</p>
                        <p>{ownerInfo.email}</p>
                    </div>
                </div>
                <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded">
                    Submit Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
