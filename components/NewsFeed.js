"use client";

import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/Hero";
import StoryList from "@/components/StoryList";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { Newspaper, Layers, Home } from "lucide-react";
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
  // Show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700 font-semibold">
            Loading NewsPilot
          </p>
          <p className="text-sm text-gray-500">Fetching latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DateModeProvider initial="absolute">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-21">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="flex-1">
              <SearchBar value={q} onChange={setQ} />
            </div>

            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Newspaper className="h-5 w-5" />
              <span>Discover More</span>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <CryptoComponent />
          </div>

          <div className="space-y-6">
            {topStory && <HeroSection story={topStory} />}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-4 mt-10 max-w-md mx-auto">
                <Newspaper className="h-5 w-5 text-gray-500" />
                <p className="text-center text-gray-600 font-medium">
                  Sorry, no articles were found.
                </p>
              </div>
            ) : (
              <StoryList
                stories={otherStories}
                title="Latest News"
                columns="lg:grid-cols-3"
              />
            )}
            <section className="my-10 px-4 md:px-6">
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
    </>
  );
}
