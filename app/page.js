"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";
import { fetchCrypto } from "../store/slices/cryptoSlice";
import { fetchNews } from "../store/slices/newsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  // Fetch all data when the page loads
  useEffect(() => {
    dispatch(fetchWeather("New York"));
    dispatch(fetchWeather("London"));
    dispatch(fetchWeather("Tokyo"));
    dispatch(fetchCrypto());
    dispatch(fetchNews());
  }, [dispatch]);

  const weatherData = useSelector((state) => state.weather.data);
  const cryptoData = useSelector((state) => state.crypto.data);
  const newsData = useSelector((state) => state.news.data);

  const isNewsArray = Array.isArray(newsData) ? newsData.slice(0, 5) : [];


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">CryptoWeather Nexus</h1>

      {/* Weather Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Weather</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["New York", "London", "Tokyo"].map((city) => (
            <div key={city} className="p-4 border rounded-lg shadow-md">
              {weatherData?.[city] ? (
                <>
                  <h3 className="font-bold">{city}</h3>
                  <p>Temp: {weatherData[city].main.temp}°C</p>
                  <p>Humidity: {weatherData[city].main.humidity}%</p>
                  <p>Condition: {weatherData[city].weather[0].description}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cryptocurrency Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Cryptocurrency</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cryptoData.slice(0, 3).map((coin) => (
            <div key={coin.id} className="p-4 border rounded-lg shadow-md">
              <h3 className="font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
              <p>Price: ${coin.current_price}</p>
              <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
              <p>Market Cap: ${coin.market_cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crypto News Section */}
      <section className="mb-6">
    <h2 className="text-2xl font-semibold">Crypto News</h2>
    {isNewsArray.length > 0 ? (
      <ul className="list-disc pl-5">
        {isNewsArray.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No news available at the moment.</p>
    )}
  </section>
    </div>
  );
}
