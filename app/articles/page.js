"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import StoryList from "@/components/StoryList";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchOldNews = async () => {
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

  return (
    <>
      <section className="border-b border-gray-200">
        <div className="container m-auto py-4 px-6 mt-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
            prefetch={false}
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </section>
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
