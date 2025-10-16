"use client";
import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/Hero";
import StoryList from "@/components/StoryList";
import { supabase } from "@/app/lib/supabaseClient";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { Archive } from "lucide-react";
import MarketSidebar from "./MarketSidebar";

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
      const { data, error } = await supabase
        .from("tech_news")
        .select("*")
        .gte("published_at", startOfDay)
        .lte("published_at", endOfDay)
        .order("published_at", { ascending: false });
      console.log("🧪 Supabase data:", data);
      if (error) {
        console.error("❌ Error fetching news:", error);
      } else {
        console.log("✅ Fetched stories:", data);

        setStories(data || []);
      }
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
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-35 space-y-6">
        {/* Search and Archive Button Container */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar value={q} onChange={setQ} />
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <Archive className="h-5 w-5" />
            More Articles
          </Link>
        </div>
        {/* LEFT: news content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {topStory && <HeroSection story={topStory} />}
            <StoryList stories={otherStories} />

            <section className="m-auto max-w-lg my-10 px-6">
              <Link
                href="/articles"
                className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 transition"
              >
                View All News
              </Link>
            </section>
          </div>
          {/* RIGHT: sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-40">
              <MarketSidebar />
            </div>
          </div>
        </div>
      </div>
    </DateModeProvider>
  );
}
