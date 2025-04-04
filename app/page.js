"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";
import { fetchCrypto } from "../store/slices/cryptoSlice";
import { fetchNews } from "@/utils/api";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    dispatch(fetchWeather("New York"));
    dispatch(fetchWeather("London"));
    dispatch(fetchWeather("Tokyo"));
    dispatch(fetchCrypto());

    const loadNews = async () => {
      try {
        const articles = await fetchNews("crypto");
        if (Array.isArray(articles) && articles.length >= 3) {
          setNewsData(articles.slice(0, 3));
        } else {
          setNewsData([]);
          console.warn("Not enough news articles to display.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]);
      }
    };

    loadNews();
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated newsData:", newsData);
  }, [newsData]);

  const weatherData = useSelector((state) => state.weather.data);
  const cryptoData = useSelector((state) => state.crypto.data);

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
              <h3 className="font-bold">
                {coin.name} ({coin.symbol.toUpperCase()})
              </h3>
              <p>Price: ${coin.current_price}</p>
              <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
              <p>Market Cap: ${coin.market_cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crypto News Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Crypto News</h2>
        {newsData.length > 0 ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {newsData.map((article, index) => (
              <li
                key={index}
                className="bg-zinc-700 rounded-xl shadow-md p-6 transition hover:shadow-xl"
              >
                <h2 className="text-lg font-semibold text-white mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-white">{article.pubDate}</p>
                <p className="text-white mt-2 line-clamp-4">
                  {article.description}
                </p>
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
