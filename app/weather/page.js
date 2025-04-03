"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/api";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      const data = await fetchWeather("New York");
      setWeather(data);
    }
    loadWeather();
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold">Weather Information</h1>
      {weather ? (
        <div className="mt-4 bg-gray-800 p-4 rounded">
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </main>
  );
}
