import React from "react";
import CountUp from "react-countup";
import img from "../../../assets/success-metrics.webp";

const SuccessMetrics = () => {
    return (
        <div className="relative py-16 text-white bg-fixed bg-gray-900 bg-center bg-cover mb-28"
            style={{ backgroundImage: `url(${img})` }}>
            <section
                className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0"
                
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Dark overlay for readability */}

                <div className="relative mx-auto text-center">
                    {/* <h2 className="text-4xl font-bold">Our Success is Measured by Results</h2>
                <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-300">
                    We take pride in our impact, helping innovators and entrepreneurs achieve success through technology and collaboration.
                </p> */}
                    <h2 className='pb-5 text-4xl font-bold text-center uppercase'>Our Success</h2>
                    <p className='pb-10 text-xl font-semibold text-center'>We take pride in our impact, helping innovators and entrepreneurs achieve success through technology and collaboration.</p>

                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 md:grid-cols-4">
                        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-indigo-400">
                                <CountUp end={1154} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-300">Happy Clients</p>
                            <p className="text-sm text-gray-400">Viverra sem magna egestas</p>
                        </div>

                        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                            <h3 className="text-4xl font-bold text-indigo-400">
                                <CountUp end={1409} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-300">Tickets Closed</p>
                            <p className="text-sm text-gray-400">Donec enim ipsum porta justo</p>
                        </div>

                        <div className="p-6 bg-gray-800 rounded-lg shadow-lg ">
                            <h3 className="text-4xl font-bold text-indigo-400">
                                <CountUp end={869} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-300">Followers</p>
                            <p className="text-sm text-gray-400">Velna iaculis odio auctor</p>
                        </div>

                        <div className="p-6 bg-gray-800 rounded-lg shadow-lg ">
                            <h3 className="text-4xl font-bold text-indigo-400">
                                <CountUp end={901} duration={3} />+
                            </h3>
                            <p className="mt-2 text-gray-300">Cups of Coffee</p>
                            <p className="text-sm text-gray-400">Integer congue impedit magna</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessMetrics;
