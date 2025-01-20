import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        // Fetch statistics from the backend
        const fetchStatistics = async () => {
            try {
                const response = await axios.get("https://inno-spot-server.vercel.app/statistics");
                if (response.data.success) {
                    setStatistics(response.data.statistics);
                }
            } catch (error) {
                console.error("Error fetching statistics", error);
            }
        };

        fetchStatistics();
    }, []);

    // If statistics are not yet loaded, show a loading message
    if (!statistics) {
        return <div>Loading...</div>;
    }

    // Prepare data for the pie chart
    const data = {
        labels: ["Accepted Products", "Pending Products", "Total Products", "Reviews", "Users"],
        datasets: [
            {
                data: [
                    statistics.acceptedProducts,
                    statistics.pendingProducts,
                    statistics.totalProducts,
                    statistics.totalReviews,
                    statistics.totalUsers,
                ],
                backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#FF9F40"],
            },
        ],
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Admin Statistics</h1>
            <div className="mt-6">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default StatisticsPage;
