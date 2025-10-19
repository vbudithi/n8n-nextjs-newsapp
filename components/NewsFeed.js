"use client";

import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/Hero";
import StoryList from "@/components/StoryList";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { Newspaper, Layers } from "lucide-react";
import CryptoComponent from "./CryptoComponent";
import { fetchNewArticlesByDateRange } from "@/utils/request";

export default function NewsFeed() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const startOfDay = new Date(today + "T00:00:00Z").toISOString();
      const endOfDay = new Date(today + "T23:59:59Z").toISOString();
      console.log("⏳ Fetching news for:", today, startOfDay, endOfDay);
      const data = await fetchNewArticlesByDateRange(startOfDay, endOfDay);
      setStories(data || []);
      setLoading(false);
    };
    fetchNews();
  }, [today]);

  const filtered = useMemo(() => {
    if (!q.trim()) return stories;
    const t = q.trim().toLowerCase();
    return stories.filter((s) => (s.title || "").toLowerCase().includes(t));
  }, [q, stories]);

  const topStory = filtered[0];
  const otherStories = filtered.slice(1);

  if (loading)
    return <p className="text-center mt-10">Loading latest news...</p>;

  if (!stories.length)
    return (
      <p className="text-center mt-10 text-gray-500">No news available.</p>
    );

  return (
    <DateModeProvider initial="absolute">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-35">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1">
            <SearchBar value={q} onChange={setQ} />
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap md:whitespace-normal"
          >
            <Newspaper className="h-5 w-5" />
            <span className="md:inline">Discover More</span>
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          <CryptoComponent />
        </div>
        <div className="w-full space-y-6">
          {topStory && <HeroSection story={topStory} />}
          <StoryList
            stories={otherStories}
            title="Latest News"
            columns="lg:grid-cols-3"
          />
          <section className="w-full my-10 px-4 md:px-6">
            <Link
              href="/articles"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Layers className="h-5 w-5" />
              Browse All News
            </Link>
          </section>
        </div>
      </div>
    </DateModeProvider>
  );
}
