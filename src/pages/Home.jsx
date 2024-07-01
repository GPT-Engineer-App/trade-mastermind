import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const offers = [
    { title: "Savings Account", description: "Get 5% interest on your savings." },
    { title: "Credit Card", description: "No annual fee for the first year." },
    { title: "Home Loan", description: "Low interest rates on home loans." },
  ];

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Welcome to Our Bank</h1>
      <div className="w-3/4">
        {offers.map((offer, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{offer.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;