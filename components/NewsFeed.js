"use client";
import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/Hero";
import StoryList from "@/components/StoryList";
import { supabase } from "@/app/lib/supabaseClient";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "./SearchBar";
import Link from "next/link";

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
      <div className="space-y-6 pt-30">
        <SearchBar value={q} onChange={setQ} />
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
    </DateModeProvider>
  );
}
