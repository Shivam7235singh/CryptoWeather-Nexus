"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../../../store/slices/cryptoSlice";
import { useParams } from "next/navigation";

export default function CryptoDetails() {
  const dispatch = useDispatch();
  const { coin } = useParams();

  useEffect(() => {
    dispatch(fetchCrypto());
  }, [dispatch]);

  const crypto = useSelector((state) =>
    state.crypto.data.find((c) => c.id === coin)
  );

  if (!crypto) return <p>Loading crypto data...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
      <p>Price: ${crypto.current_price}</p>
      <p>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Market Cap: ${crypto.market_cap}</p>
      {/* TODO: Add a chart for historical data */}
    </div>
  );
}
