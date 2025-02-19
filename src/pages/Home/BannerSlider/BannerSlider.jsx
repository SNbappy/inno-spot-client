import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Imported images
import slide1 from "../../../assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg";
import slide2 from "../../../assets/idea.jpg";
import slide3 from "../../../assets/joinCommunity.jpg";

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            image: slide1,
            title: "Welcome to InnoSpot",
            description:
                "Discover the latest innovations and creative ideas shaping the future. Join our community to explore, share, and grow!",
        },
        {
            id: 2,
            image: slide2,
            title: "Showcase Your Ideas",
            description:
                "Got an innovative app or product? Share it with the world and get the recognition you deserve.",
        },
        {
            id: 3,
            image: slide3,
            title: "Join the Community",
            description:
                "Connect with innovators, investors, and tech enthusiasts. Let’s build a better future together!",
        },
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="object-cover w-full h-full absolute left-0 top-0 z-[-1]"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white bg-black bg-opacity-50">
                            <h1 className="text-4xl font-bold md:text-5xl drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="max-w-3xl mt-4 text-lg md:text-xl">
                                {slide.description}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;
