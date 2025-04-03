"use client"; // Required in Next.js App Router
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";

export default function Weather() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather("New York")); // Example city
  }, [dispatch]);

  if (status === "loading") return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Weather in {data?.name}</h2>
      <p>Temperature: {data?.main?.temp}°C</p>
      <p>Humidity: {data?.main?.humidity}%</p>
      <p>Condition: {data?.weather[0]?.description}</p>
    </div>
  );
}
