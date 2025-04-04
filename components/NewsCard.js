// components/CryptoNews.jsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoNews } from "@/store/slices/newsSlice";
import NewsCard from "./NewsCard";

export default function CryptoNews() {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getCryptoNews());
  }, [dispatch]);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trending Crypto News</h1>
      {status === "loading" ? (
        <p>Loading news...</p>
      ) : status === "failed" ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description || "No description"}
              imageUrl={article.image_url || "/default-news.jpg"}
              link={article.link}
            />
          ))}
        </div>
      )}
    </main>
  );
}
