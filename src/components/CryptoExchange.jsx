import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const CryptoExchange = () => {
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [cryptoCurrency, setCryptoCurrency] = useState("BTC");
  const [fiatCurrency, setFiatCurrency] = useState("USD");

  const handleCryptoConversion = async () => {
    try {
      const response = await axios.get(`https://api.example.com/crypto-conversion?crypto=${cryptoCurrency}&fiat=${fiatCurrency}`);
      const rate = response.data.rate;
      setConvertedAmount(cryptoAmount * rate);
    } catch (error) {
      console.error("Error fetching crypto conversion rate:", error);
    }
  };

  return (
    <div className="crypto-exchange">
      <h2 className="text-2xl mb-4">Cryptocurrency Exchange</h2>
      <Input
        type="number"
        value={cryptoAmount}
        onChange={(e) => setCryptoAmount(e.target.value)}
        placeholder="Crypto Amount"
        className="mb-2"
      />
      <Input
        type="text"
        value={cryptoCurrency}
        onChange={(e) => setCryptoCurrency(e.target.value)}
        placeholder="Crypto Currency (e.g., BTC)"
        className="mb-2"
      />
      <Input
        type="text"
        value={fiatCurrency}
        onChange={(e) => setFiatCurrency(e.target.value)}
        placeholder="Fiat Currency (e.g., USD)"
        className="mb-2"
      />
      <Button onClick={handleCryptoConversion} variant="outline" className="mb-2">
        Convert
      </Button>
      {convertedAmount && <p>Converted Amount: {convertedAmount} {fiatCurrency}</p>}
    </div>
  );
};

export default CryptoExchange;