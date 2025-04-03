"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../../store/slices/weatherSlice";
import { useParams } from "next/navigation";

export default function WeatherDetails() {
  const dispatch = useDispatch();
  const { city } = useParams();

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  const weather = useSelector((state) => state.weather.data?.[city]);

  if (!weather) return <p>Loading weather data...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{city} Weather</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Condition: {weather.weather[0].description}</p>
      {/* TODO: Add a chart for historical data */}
    </div>
  );
}
