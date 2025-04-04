"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";

const cities = ["New York", "Delhi", "Tokyo"];

export default function Weather() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeather(city)));
  }, [dispatch]);

  if (status === "loading" && Object.keys(data).length === 0) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => {
        const cityData = data[city];
        return cityData ? (
          <div key={city} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Weather in {city}</h2>
            <p>Temperature: {cityData.main?.temp}°C</p>
            <p>Humidity: {cityData.main?.humidity}%</p>
            <p>Condition: {cityData.weather[0]?.description}</p>
          </div>
        ) : (
          <div key={city}>Loading {city}...</div>
        );
      })}
    </div>
  );
}
