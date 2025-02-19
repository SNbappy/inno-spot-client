import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Sophia Carter",
        avatar: "https://i.pravatar.cc/100?img=10",
        rating: 5,
        review: "InnoSpot is an incredible platform for discovering new innovations. The UI is sleek and easy to navigate!",
    },
    {
        name: "Daniel Lee",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 4,
        review: "Great experience! I found some amazing projects here. Just wish there were more filtering options.",
    },
    {
        name: "Emma Brown",
        avatar: "https://i.pravatar.cc/100?img=15",
        rating: 5,
        review: "Absolutely love how well-organized InnoSpot is. It has helped me connect with great innovators!",
    },
];

export default function Reviews() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 mb-28">
            <div className="max-w-4xl mx-auto rounded-lg">
                <h2 className='pb-5 text-4xl font-bold text-center uppercase'>What Users Say</h2>
                <p className='pb-10 text-xl font-semibold text-center'>Hear from innovators and enthusiasts about their experience</p>
                <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full p-8 text-center bg-white border border-gray-200 shadow-md rounded-2xl"
                >
                    <img
                        src={reviews[selected].avatar}
                        alt={reviews[selected].name}
                        className="w-20 h-20 mx-auto mb-4 border-4 border-gray-300 rounded-full"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{reviews[selected].name}</h3>
                    <div className="flex justify-center gap-1 my-3">
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} size={22} className={index < reviews[selected].rating ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                    </div>
                    <p className="max-w-2xl mx-auto text-lg italic text-gray-700">“{reviews[selected].review}”</p>
                </motion.div>
                <div className="flex justify-center gap-3 mt-6">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${selected === index ? "bg-gray-900 scale-110" : "bg-gray-400 hover:bg-gray-500"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
