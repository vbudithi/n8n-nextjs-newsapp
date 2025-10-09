"use client";
import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "@/components/Hero";
import StoryList from "@/components/StoryList";
import { supabase } from "@/app/lib/supabaseClient";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "./SearchBar";

export default function NewsFeed() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
const [q, setQ] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("tech_news").select("*");
      if (error) console.error("❌ Error fetching news:", error);
      else setStories(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);


const filtered = useMemo(() => {
  if (!q.trim()) return stories;
  const t = q.trim().toLowerCase();
  return stories.filter(s => (s.title || "").toLowerCase().includes(t));
}, [q, stories]);

const topStory = filtered[0];
const otherStories = filtered.slice(1);


  if (loading) return <p className="text-center mt-10">Loading latest news...</p>;
  if (!stories.length)
    return <p className="text-center mt-10 text-gray-500">No news available.</p>;

  return (
    <DateModeProvider initial="absolute">
      <div className="space-y-6 pt-30">
            <SearchBar value={q} onChange={setQ} />
        {topStory && <HeroSection story={topStory} />}
        <StoryList stories={otherStories} />
      </div>
    </DateModeProvider>
  );
}
