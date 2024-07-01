import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const GoldSilverPrices = () => {
  const [goldData, setGoldData] = useState([]);
  const [silverData, setSilverData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchGoldSilverData = async () => {
      try {
        const response = await axios.get("https://api.example.com/gold-silver-data");
        const data = response.data;
        const goldPrices = data.map((item) => item.goldPrice);
        const silverPrices = data.map((item) => item.silverPrice);
        const times = data.map((item) => item.time);
        setGoldData(goldPrices);
        setSilverData(silverPrices);
        setLabels(times);
      } catch (error) {
        console.error("Error fetching gold and silver data:", error);
      }
    };

    fetchGoldSilverData();
    const interval = setInterval(fetchGoldSilverData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Gold Price",
        data: goldData,
        borderColor: "rgba(255, 215, 0, 1)",
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        fill: true,
      },
      {
        label: "Silver Price",
        data: silverData,
        borderColor: "rgba(192, 192, 192, 1)",
        backgroundColor: "rgba(192, 192, 192, 0.2)",
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
        text: "Gold & Silver Price Fluctuations",
      },
    },
  };

  return (
    <div className="gold-silver-prices">
      <h2 className="text-2xl mb-4">Gold & Silver Prices</h2>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GoldSilverPrices;