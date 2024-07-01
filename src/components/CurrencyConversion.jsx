import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const CurrencyConversion = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get("https://api.example.com/currency-data");
        const data = response.data;
        const conversionRates = data.map((item) => item.rate);
        const times = data.map((item) => item.time);
        setCurrencyData(conversionRates);
        setLabels(times);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Currency Conversion Rate",
        data: currencyData,
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
        text: "Foreign Currency Conversion Rates",
      },
    },
  };

  return (
    <div className="currency-conversion">
      <h2 className="text-2xl mb-4">Currency Conversion</h2>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CurrencyConversion;