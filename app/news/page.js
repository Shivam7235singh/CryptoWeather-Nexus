"use client";

import { useEffect, useState } from "react";
import { fetchNews } from "@/utils/api";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const articles = await fetchNews("crypto");
      setNewsList(articles);
    }
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Trending Crypto News
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {newsList.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500">{article.pubDate}</p>
            <p className="text-gray-700 mt-2 line-clamp-4">{article.description}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline mt-4 inline-block"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
