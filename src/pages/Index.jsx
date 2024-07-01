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
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("https://api.example.com/stock-data");
        const data = response.data;
        const prices = data.map((item) => item.price);
        const times = data.map((item) => item.time);
        setStockData(prices);
        setLabels(times);
        calculateTopStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  const calculateTopStocks = (data) => {
    const marginJumps = data.map((item, index) => {
      if (index === 0) return { ...item, marginJump: 0 };
      return { ...item, marginJump: item.price - data[index - 1].price };
    });

    const sortedStocks = marginJumps.sort((a, b) => b.marginJump - a.marginJump);
    const top5Stocks = sortedStocks.slice(0, 5);
    setTopStocks(top5Stocks);
  };

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
      <div className="w-3/4 mt-4">
        <h2 className="text-2xl text-center">Top 5 Stocks with Biggest Margin Jumps</h2>
        <ul className="list-disc list-inside">
          {topStocks.map((stock, index) => (
            <li key={index}>
              {stock.name}: {stock.marginJump}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;