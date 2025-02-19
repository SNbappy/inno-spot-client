import React from "react";
import CountUp from "react-countup";
import img from "../../../assets/op-agency-blog-05.png"

const EmpoweringInnovation = () => {
    return (
        <section className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
            {/* <h2 className="pb-5 text-4xl font-bold text-center">Empowering Innovation</h2>
            <p className="pb-10 text-lg text-center">
                Building a Future of Creativity & Technology
            </p> */}
            <h2 className='pb-5 text-4xl font-bold text-center uppercase'>Empowering Innovation</h2>
            <p className='pb-10 text-xl font-semibold text-center'>Building a Future of Creativity & Technology</p>
            <div className="flex flex-col items-center gap-6 mx-auto mb-28 max-w-7xl md:flex-row">
                
                {/* Text Content */}
                <div className="md:w-1/2 md:pr-8">
                    
                    <p className="mt-6 text-gray-600">
                        At <span className="font-semibold text-indigo-600">InnoSpot</span>, we empower creators, entrepreneurs, and tech enthusiasts
                        by providing a platform to showcase, discover, and engage with the most innovative digital solutions.
                        Whether you're a startup founder, a developer, or an investor, InnoSpot connects you with groundbreaking ideas that drive progress.
                    </p>
                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-[#ff3366] text-center">
                                <CountUp end={1780} duration={3} />+
                            </h3>
                            <p className="mt-2 text-center text-gray-700">Innovative Products Launched</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-[#ff3366] text-center">
                                <CountUp end={850} duration={3} />+
                            </h3>
                            <p className="mt-2 text-center text-gray-700">Tech Enthusiasts Engaged</p>
                        </div>
                        {/* <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-indigo-600">
                                <CountUp end={320} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-700">Startups Showcased</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-indigo-600">
                                <CountUp end={1200} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-700">Community Collaborations</p>
                        </div> */}
                    </div>
                </div>
                {/* Image */}
                <div className="mt-8 md:w-1/2 md:mt-0">
                    <img
                        src={img}
                        alt="Innovation Illustration"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default EmpoweringInnovation;
