import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CouponCarousel = () => {
    const [coupons, setCoupons] = useState([]);

    // Fetch valid coupons on load
    useEffect(() => {
        fetchValidCoupons();
    }, []);

    const fetchValidCoupons = async () => {
        try {
            const response = await axios.get("http://localhost:5000/coupons");
            if (response.data.success) {
                const validCoupons = response.data.coupons.filter((coupon) => {
                    const expiryDate = new Date(coupon.expiryDate);
                    return expiryDate >= new Date(); // Filter out expired coupons
                });
                setCoupons(validCoupons);
            }
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    // React Slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="py-8">
            <h2 className="mb-6 text-2xl font-bold text-center">Exclusive Coupons</h2>
            <Slider {...settings}>
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="p-4">
                        <div className="p-6 text-center bg-white border rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-blue-500">{coupon.code}</h3>
                            <p className="mt-2 text-gray-500">{coupon.description}</p>
                            <p className="mt-2 font-bold text-green-500">
                                Discount: ${coupon.discountAmount}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CouponCarousel;
