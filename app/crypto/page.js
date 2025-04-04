"use client";
import { useEffect, useState } from "react";
import { fetchCrypto } from "@/utils/api";

export default function CryptoPage() {
  const [crypto, setCrypto] = useState(null);
  const coins = ["bitcoin", "ethereum", "dogecoin", "solana", "cardano", "polkadot"];

  useEffect(() => {
    async function loadCrypto() {
      const data = await fetchCrypto();
      setCrypto(data);
    }
    loadCrypto();
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Prices</h1>
      {crypto ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {coins.map((coin) => (
            <div
              key={coin}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold capitalize">{coin}</h2>
              <p className="mt-2">💰 Price: ${crypto[coin]?.usd}</p>
              <p>
                📉 24h Change:{" "}
                {crypto[coin]?.usd_24h_change
                  ? crypto[coin].usd_24h_change.toFixed(2)
                  : "N/A"}
                %
              </p>
              <p>📊 Market Cap: ${crypto[coin]?.usd_market_cap?.toLocaleString()}</p>
              <p>🔄 24h Volume: ${crypto[coin]?.usd_24h_vol?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading crypto prices...</p>
      )}
    </main>
  );
}
