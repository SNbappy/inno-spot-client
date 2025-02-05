import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch statistics from the backend
        const fetchStatistics = async () => {
            try {
                const response = await axios.get("https://inno-spot-server.vercel.app/statistics");
                if (response.data.success) {
                    setStatistics(response.data.statistics);
                } else {
                    console.error("Failed to fetch statistics:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching statistics:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <div className="mt-10 text-center">Loading...</div>;
    }

    if (!statistics) {
        return <div className="mt-10 text-center">No statistics data available.</div>;
    }

    // Prepare data for the pie chart
    const data = {
        labels: ["Accepted Products", "Pending Products", "Total Products", "Reviews", "Users"],
        datasets: [
            {
                label: "Platform Statistics",
                data: [
                    statistics.acceptedProducts,
                    statistics.pendingProducts,
                    statistics.totalProducts,
                    statistics.totalReviews,
                    statistics.totalUsers,
                ],
                backgroundColor: [
                    "#4CAF50", // Green for Accepted Products
                    "#FF9800", // Orange for Pending Products
                    "#2196F3", // Blue for Total Products
                    "#FF5722", // Red for Reviews
                    "#9C27B0", // Purple for Users
                ],
                hoverOffset: 8, // Offset on hover for better interactivity
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom", // Legend position
            },
        },
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold text-center">Admin Dashboard Statistics</h1>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md h-96">
                    {/* Pie Chart */}
                    <Pie data={data} options={options} />
                </div>
            </div>
            {/* Display detailed statistics below the chart */}
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 bg-green-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Accepted Products</h3>
                    <p className="text-2xl font-bold">{statistics.acceptedProducts}</p>
                </div>
                <div className="p-4 bg-orange-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Pending Products</h3>
                    <p className="text-2xl font-bold">{statistics.pendingProducts}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-2xl font-bold">{statistics.totalProducts}</p>
                </div>
                <div className="p-4 bg-red-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total Reviews</h3>
                    <p className="text-2xl font-bold">{statistics.totalReviews}</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-2xl font-bold">{statistics.totalUsers}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
