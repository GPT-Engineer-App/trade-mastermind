import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const [stockData, setStockData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [sellAtPeak, setSellAtPeak] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("https://api.example.com/stock-data");
        const data = response.data;
        const prices = data.map((item) => item.price);
        const times = data.map((item) => item.time);
        setStockData(prices);
        setLabels(times);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  const handleSellAtPeak = () => {
    setSellAtPeak(true);
    // Logic to sell stocks at peak ratio
    console.log("Selling stocks at peak ratio...");
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price",
        data: stockData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Live Predictive Stock Graph",
      },
    },
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Live Predictive Stock Graph</h1>
      <div className="w-3/4">
        <Line data={data} options={options} />
      </div>
      <Button onClick={handleSellAtPeak} variant="outline">
        Sell at Peak Ratio
      </Button>
    </div>
  );
};

export default Index;