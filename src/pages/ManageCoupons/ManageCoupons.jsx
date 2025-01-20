import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [formData, setFormData] = useState({
        code: "",
        expiryDate: "",
        description: "",
        discountAmount: "",
    });
    const [editingCoupon, setEditingCoupon] = useState(null);

    // Fetch coupons on load
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get("https://inno-spot-server.vercel.app/coupons");
            if (response.data.success) {
                setCoupons(response.data.coupons);
            }
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://inno-spot-server.vercel.app/coupons", formData);
            if (response.data.success) {
                fetchCoupons(); // Refresh coupon list
                setFormData({ code: "", expiryDate: "", description: "", discountAmount: "" });
            }
        } catch (error) {
            console.error("Error adding coupon:", error);
        }
    };

    const handleEditCoupon = (coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0],
            description: coupon.description,
            discountAmount: coupon.discountAmount,
        });
    };

    const handleUpdateCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://inno-spot-server.vercel.app/coupons/${editingCoupon._id}`, formData);
            if (response.data.success) {
                fetchCoupons(); // Refresh coupon list
                setEditingCoupon(null);
                setFormData({ code: "", expiryDate: "", description: "", discountAmount: "" });
            }
        } catch (error) {
            console.error("Error updating coupon:", error);
        }
    };

    const handleDeleteCoupon = async (id) => {
        try {
            const response = await axios.delete(`https://inno-spot-server.vercel.app/coupons/${id}`);
            if (response.data.success) {
                fetchCoupons(); // Refresh coupon list
            }
        } catch (error) {
            console.error("Error deleting coupon:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Manage Coupons</h1>

            <form onSubmit={editingCoupon ? handleUpdateCoupon : handleAddCoupon} className="mt-4">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="Coupon Code"
                        className="p-2 border"
                        required
                    />
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="p-2 border"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Coupon Description"
                        className="p-2 border"
                        required
                    ></textarea>
                    <input
                        type="number"
                        name="discountAmount"
                        value={formData.discountAmount}
                        onChange={handleInputChange}
                        placeholder="Discount Amount"
                        className="p-2 border"
                        required
                    />
                    <button type="submit" className="p-2 text-white bg-blue-500">
                        {editingCoupon ? "Update Coupon" : "Add Coupon"}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="p-4 border rounded shadow">
                        <h2 className="text-lg font-bold">{coupon.code}</h2>
                        <p>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                        <p>{coupon.description}</p>
                        <p>Discount: ${coupon.discountAmount}</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleEditCoupon(coupon)}
                                className="p-2 text-white bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCoupon(coupon._id)}
                                className="p-2 text-white bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCoupons;


