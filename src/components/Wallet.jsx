import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(1000); // Example balance
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(balance - withdrawAmount);
      setWithdrawAmount("");
    } else {
      alert("Invalid withdraw amount");
    }
  };

  const handleCurrencyConversion = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      const rate = response.data.rates["USD"]; // Example conversion to USD
      setConvertedAmount(withdrawAmount * rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <div className="wallet">
      <h2 className="text-2xl mb-4">Wallet</h2>
      <p className="mb-2">Balance: ${balance}</p>
      <Input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Withdraw Amount"
        className="mb-2"
      />
      <Button onClick={handleWithdraw} variant="outline" className="mb-2">
        Withdraw
      </Button>
      <Button onClick={handleCurrencyConversion} variant="outline" className="mb-2">
        Convert Currency
      </Button>
      {convertedAmount && <p>Converted Amount: ${convertedAmount}</p>}
    </div>
  );
};

export default Wallet;