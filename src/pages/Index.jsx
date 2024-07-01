import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Wallet from "@/components/Wallet";
import FundamentalAnalysis from "@/components/FundamentalAnalysis";
import CryptoExchange from "@/components/CryptoExchange";
import GoldSilverPrices from "@/components/GoldSilverPrices";
import CurrencyConversion from "@/components/CurrencyConversion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "react-tabs/style/react-tabs.css";
import CountdownTimer from "@/components/CountdownTimer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const [stockData, setStockData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [sellAtPeak, setSellAtPeak] = useState(false);
  const [topStocks, setTopStocks] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [goldSilverData, setGoldSilverData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

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

    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("https://api.example.com/crypto-data");
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    const fetchGoldSilverData = async () => {
      try {
        const response = await axios.get("https://api.example.com/gold-silver-data");
        setGoldSilverData(response.data);
      } catch (error) {
        console.error("Error fetching gold and silver data:", error);
      }
    };

    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get("https://api.example.com/currency-data");
        setCurrencyData(response.data);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchStockData();
    fetchCryptoData();
    fetchGoldSilverData();
    fetchCurrencyData();

    const interval = setInterval(() => {
      fetchStockData();
      fetchCryptoData();
      fetchGoldSilverData();
      fetchCurrencyData();
    }, 60000); // Fetch data every minute

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

  const stockDataForLineChart = {
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

  const stockDataForBarChart = {
    labels: topStocks.map(stock => stock.name),
    datasets: [
      {
        label: "Margin Jump",
        data: topStocks.map(stock => stock.marginJump),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
        <Line data={stockDataForLineChart} options={options} />
      </div>
      <Button onClick={handleSellAtPeak} variant="outline">
        Sell at Peak Ratio
      </Button>
      <Tabs defaultValue="live-prediction-stock">
        <TabsList>
          <TabsTrigger value="live-prediction-stock">Live Prediction Stock</TabsTrigger>
          <TabsTrigger value="top-5-stocks">Top 5 Stocks</TabsTrigger>
          <TabsTrigger value="next-automated-picks">Next Automated Picks</TabsTrigger>
          <TabsTrigger value="crypto-currency">Crypto & Currency</TabsTrigger>
        </TabsList>
        <TabsContent value="live-prediction-stock">
          <div className="w-3/4">
            <Line data={stockDataForLineChart} options={options} />
          </div>
        </TabsContent>
        <TabsContent value="top-5-stocks">
          <div className="w-3/4 mt-4">
            <h2 className="text-2xl text-center">Top 5 Stocks with Biggest Margin Jumps</h2>
            <Bar data={stockDataForBarChart} options={options} />
          </div>
        </TabsContent>
        <TabsContent value="next-automated-picks">
          <CountdownTimer />
        </TabsContent>
        <TabsContent value="crypto-currency">
          <Tabs defaultValue="crypto-exchange">
            <TabsList>
              <TabsTrigger value="crypto-exchange">Cryptocurrency Exchange</TabsTrigger>
              <TabsTrigger value="currency-conversion">Currency Conversion</TabsTrigger>
            </TabsList>
            <TabsContent value="crypto-exchange">
              <CryptoExchange />
            </TabsContent>
            <TabsContent value="currency-conversion">
              <CurrencyConversion />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;