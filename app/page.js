"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert the date to the desired format (10-Jan-2025)
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/\s/g, "-");
  
    // Navigate to train-routes route with query parameters
    router.push(`/train-routes?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}&date=${encodeURIComponent(formattedDate)}`);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-8">Find Your Seat</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label htmlFor="fromCity" className="block text-sm font-medium mb-2">
            From
          </label>
          <input
            type="text"
            id="fromCity"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter departure location"
            required
          />
        </div>

        <div>
          <label htmlFor="toCity" className="block text-sm font-medium mb-2">
            To
          </label>
          <input
            type="text"
            id="toCity"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter destination"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Journey Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
