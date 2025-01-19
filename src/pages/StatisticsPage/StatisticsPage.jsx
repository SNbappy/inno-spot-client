import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState({
        totalProducts: 0,
        acceptedProducts: 0,
        pendingProducts: 0,
        totalReviews: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/statistics");
                setStatistics(response.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const pieData = {
        labels: ["Accepted Products", "Pending Products", "All Products", "Total Reviews", "Total Users"],
        datasets: [
            {
                data: [
                    statistics.acceptedProducts,
                    statistics.pendingProducts,
                    statistics.totalProducts,
                    statistics.totalReviews,
                    statistics.totalUsers,
                ],
                backgroundColor: ["#4CAF50", "#FFC107", "#03A9F4", "#FF5722", "#9C27B0"],
                hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#29B6F6", "#FF7043", "#BA68C8"],
            },
        ],
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Admin Statistics</h1>
            <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
                <Pie data={pieData} />
            </div>
        </div>
    );
};

export default StatisticsPage;
