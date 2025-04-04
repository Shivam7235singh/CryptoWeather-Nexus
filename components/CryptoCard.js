"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "@/store/slices/cryptoSlice";

export default function CryptoList() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto());
  }, [dispatch]);

  if (status === "loading") return <p>Loading Crypto Data...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crypto Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((coin) => (
          <div key={coin.id} className="bg-gray-800 p-4 rounded text-white">
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p>Price: ${coin.current_price}</p>
            <p className={`font-bold ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
