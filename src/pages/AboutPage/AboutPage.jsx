import React from "react";

const AboutPage = () => {
    return (
        <div className="flex items-center justify-center max-w-[1250px] pt-28 mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 mb-20">
            <div className="max-w-4xl p-8 text-gray-800 bg-white shadow-xl rounded-2xl">
                <h1 className="mb-6 text-4xl font-bold text-center text-blue-600">About InnoSpot</h1>
                <p className="text-lg text-center text-gray-700">
                    Discover, showcase, and celebrate innovation with InnoSpot! Our platform is dedicated to helping creators, entrepreneurs, and tech enthusiasts share their groundbreaking products and ideas with the world.
                </p>

                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Why InnoSpot?</h2>
                    <ul className="pl-5 space-y-2 text-gray-700 list-disc">
                        <li>🚀 A hub for innovators to gain visibility and feedback.</li>
                        <li>🔥 Upvote and support groundbreaking ideas and products.</li>
                        <li>🤝 Connect with like-minded creators and tech enthusiasts.</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Mission</h2>
                    <p className="text-lg text-gray-700">
                        At InnoSpot, we believe in the power of community-driven innovation. Our goal is to create a dynamic space where creativity thrives, and users can explore the latest trends in technology and entrepreneurship.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Join the Movement</h2>
                    <p className="mb-6 text-lg text-gray-700">
                        Be part of the future. Whether you're a creator, investor, or simply a tech lover, InnoSpot welcomes you to explore and engage with innovation like never before.
                    </p>
                    <button className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
