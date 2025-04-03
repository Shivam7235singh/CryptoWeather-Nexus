"use client";
import { useEffect, useState } from "react";
import { fetchCrypto } from "@/utils/api";

export default function CryptoPage() {
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    async function loadCrypto() {
      const data = await fetchCrypto();
      setCrypto(data);
    }
    loadCrypto();
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold">Cryptocurrency Prices</h1>
      {crypto ? (
        <div className="mt-4 bg-gray-800 p-4 rounded">
          <p>Bitcoin: ${crypto.bitcoin.usd}</p>
          <p>Ethereum: ${crypto.ethereum.usd}</p>
        </div>
      ) : (
        <p>Loading crypto prices...</p>
      )}
    </main>
  );
}
