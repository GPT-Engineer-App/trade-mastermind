import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const response = await axios.get("https://api.example.com/next-pick-timer");
        const data = response.data;
        setTimeLeft(data.timeLeft);
      } catch (error) {
        console.error("Error fetching countdown timer:", error);
      }
    };

    fetchCountdown();
    const interval = setInterval(fetchCountdown, 1000); // Fetch data every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Automated Pick</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Time Left: {formatTime(timeLeft)}</p>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;