import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState({ checking: 1000, savings: 5000 }); // Example balances
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState(""); // New state for deposit amount
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [activeTab, setActiveTab] = useState("checking");

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= balance[activeTab]) {
      setBalance({
        ...balance,
        [activeTab]: balance[activeTab] - withdrawAmount,
      });
      setWithdrawAmount("");
    } else {
      alert("Invalid withdraw amount");
    }
  };

  const handleDeposit = () => {
    if (depositAmount > 0) {
      setBalance({
        ...balance,
        [activeTab]: balance[activeTab] + depositAmount,
      });
      setDepositAmount("");
    } else {
      alert("Invalid deposit amount");
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
      <Tabs defaultValue="checking" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="checking">Checking Account</TabsTrigger>
          <TabsTrigger value="savings">Savings Account</TabsTrigger>
        </TabsList>
        <TabsContent value="checking">
          <p className="mb-2">Checking Balance: ${balance.checking}</p>
        </TabsContent>
        <TabsContent value="savings">
          <p className="mb-2">Savings Balance: ${balance.savings}</p>
        </TabsContent>
      </Tabs>
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
      <Input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Deposit Amount"
        className="mb-2"
      />
      <Button onClick={handleDeposit} variant="outline" className="mb-2">
        Deposit
      </Button>
      <Button onClick={handleCurrencyConversion} variant="outline" className="mb-2">
        Convert Currency
      </Button>
      {convertedAmount && <p>Converted Amount: ${convertedAmount}</p>}
    </div>
  );
};

export default Wallet;