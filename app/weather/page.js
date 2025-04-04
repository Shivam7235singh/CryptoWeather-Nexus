"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/api";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cities = ["New York", "Delhi", "Tokyo"];

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      const results = await Promise.all(
        cities.map(async (city) => {
          const data = await fetchWeather(city);
          return { city, data };
        })
      );
      setWeatherData(results);
      setLoading(false);
    }

    loadWeather();
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Weather Information</h1>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {weatherData.map(({ city, data }) => (
            <div key={city} className="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{city}</h2>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Condition: {data.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
