"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import StoryList from "@/components/StoryList";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "@/components/SearchBar";

export default function page() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchOldNews = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from("tech_news")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching news:", error);
      } else {
        console.log("✅ Old articles:", data);
        setStories(data || []);
      }
      setLoading(false);
    };
    fetchOldNews();
  }, []);

  //search functionality
  const filtered = useMemo(() => {
    if (!q.trim()) return stories;
    const t = q.trim().toLowerCase();
    return stories.filter((s) => (s.title || "").toLowerCase().includes(t));
  }, [q, stories]);

  if (loading) {
    return <p className="text-center mt-10">Loading older articles...</p>;
  }
  if (!filtered.length) {
    return (
      <p className="text-center mt-10 text-gray-500">No articles found.</p>
    );
  }

  if (!filtered.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No older articles available.
      </p>
    );
  }

  return (
    <DateModeProvider initial="absolute">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 mt-30">
        <SearchBar value={q} onChange={setQ} />
        <StoryList stories={filtered} />
      </div>
    </DateModeProvider>
  );
}
