"use client";

import React, { useState, useEffect, useMemo } from "react";
import StoryList from "@/components/StoryList";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { fetchArticles } from "@/utils/request";

export default function page() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchOldNews = async () => {
      setLoading(true);
      const data = await fetchArticles();
      setStories(data || []);
      setLoading(false);
    };
    fetchOldNews();
  }, []);

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

  return (
    <>
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium "
          >
            <ChevronLeft className="h-5 w-5" />
            NewsPilot Home
          </Link>
        </div>
      </div>

      <DateModeProvider initial="absolute">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex justify-center">
            <SearchBar value={q} onChange={setQ} />
          </div>
          <StoryList stories={filtered} title="More Stories" />
        </div>
      </DateModeProvider>
    </>
  );
}
