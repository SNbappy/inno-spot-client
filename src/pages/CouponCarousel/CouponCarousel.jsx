import React, { useState, useEffect } from "react";
import axios from "axios";

const CouponCarousel = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get("https://inno-spot-server.vercel.app/coupons");
            if (response.data.success) {
                setCoupons(response.data.coupons); // Set all coupons (valid and expired)
            }
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    return (
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 mb-28">
            {/* <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 sm:text-5xl">
                🎉 Exclusive Coupons Just for You!
            </h2> */}
            <h2 className='pb-5 text-4xl font-bold text-center uppercase'>Coupon</h2>
            <p className='pb-10 text-xl font-semibold text-center'>🎉 Exclusive Coupons for You!</p>
            <div className="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
                {coupons.map((coupon) => {
                    const expiryDate = new Date(coupon.expiryDate);
                    const isExpired = expiryDate < new Date(); // Check if the coupon is expired
                    return (
                        <div key={coupon._id} className="flex flex-col items-center">
                            <div
                                className={`w-full p-8 transition-all transform border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 ${isExpired ? "bg-gray-200" : "bg-white"}`}
                            >
                                <h3 className="text-3xl font-bold text-blue-600">{coupon.code}</h3>
                                <p className="mt-4 text-lg text-gray-700">{coupon.description}</p>
                                <p className="mt-4 text-2xl font-semibold text-green-600">
                                    Save ${coupon.discountAmount}!
                                </p>
                                <p className="mt-4 text-sm text-gray-500">
                                    ⏳ Expires: {expiryDate.toLocaleDateString()}
                                </p>
                                {isExpired ? (
                                    <p className="mt-2 text-sm text-red-500">Expired</p>
                                ) : (
                                    <button className="px-6 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Use Coupon
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default CouponCarousel;