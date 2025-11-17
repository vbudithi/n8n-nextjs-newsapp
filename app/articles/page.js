"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { DateModeProvider } from "@/components/DateModeProvider";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft, Home, Newspaper, X } from "lucide-react";
import Link from "next/link";
import { fetchArticlesChunk } from "@/utils/request";

const LazyStoryList = dynamic(() => import("@/components/StoryList"), {
  ssr: false,
});

export default function Page() {
  const [stories, setStories] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [q, setQ] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const chunkSize = 6;
  const loadMoreRef = useRef(null);

  // Filtered stories based on search
  const filtered = useMemo(() => {
    if (!q.trim()) return stories;
    const t = q.trim().toLowerCase();
    return stories.filter((s) => (s.title || "").toLowerCase().includes(t));
  }, [q, stories]);

  // Load articles in chunks
  const loadArticles = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);

    const newArticles = await fetchArticlesChunk(startIndex, chunkSize);
    setStories((prev) => [...prev, ...newArticles]);
    setStartIndex((prev) => prev + chunkSize);
    setLoadingMore(false);

    if (newArticles.length < chunkSize) setHasMore(false);
    if (initialLoading) setInitialLoading(false); // first chunk loaded
  };

  // Initial load
  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          loadArticles();
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadingMore, hasMore]);

  if (initialLoading && stories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 bg-gray-50">
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
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 pt-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-700 font-medium"
          >
            <ChevronLeft className="h-5 w-5 sticky top-0" />
            Home
          </Link>
        </div>
      </div>

      <DateModeProvider initial="absolute">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-8">
          <div className="flex justify-center">
            <SearchBar value={q} onChange={setQ} />
          </div>

          {!stories?.length || filtered.length === 0 ? (
            <div className="flex justify-center mt-35">
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <div className="flex flex-col items-center gap-4 mt-10 max-w-md mx-auto">
                  <Newspaper className="h-5 w-5 text-gray-500" />
                  <p className="text-gray-600 font-medium">
                    No articles found for your search.
                  </p>
                  <p className="text-sm text-gray-500">
                    Try clearing your search or head back home.
                  </p>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setQ("")}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-all"
                  >
                    <X className="h-4 w-4" />
                    Clear Search
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all"
                  >
                    <Home className="h-5 w-5" />
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          <LazyStoryList
            stories={filtered}
            title="More Stories"
            loading={loadingMore || initialLoading}
          />

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-10"></div>
          {loadingMore && stories.length >= 6 && (
            <p className="text-center text-gray-500 mt-4 animate-pulse">
              Loading more articles...
            </p>
          )}

          {!hasMore && stories.length > 0 && (
            <p className="text-center text-gray-400 mt-4">No more articles</p>
          )}
        </div>
      </DateModeProvider>
    </div>
  );
}
