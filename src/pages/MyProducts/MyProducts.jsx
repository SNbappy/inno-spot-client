import React from "react";

const MyProducts = () => {
    const products = [
        { name: "Product 1", votes: 10, status: "Pending" },
        { name: "Product 2", votes: 5, status: "Pending" },
    ];

    const handleDelete = (productName) => {
        // Handle deletion logic here
        console.log("Deleted:", productName);
    };

    const handleUpdate = (productName) => {
        // Handle update logic here
        console.log("Updated:", productName);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold">My Products</h2>
            <table className="w-full mt-4 border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b">Votes</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border-b">{product.name}</td>
                            <td className="px-4 py-2 border-b">{product.votes}</td>
                            <td className="px-4 py-2 border-b">{product.status}</td>
                            <td className="px-4 py-2 border-b">
                                <button
                                    onClick={() => handleUpdate(product.name)}
                                    className="text-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(product.name)}
                                    className="ml-4 text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;
