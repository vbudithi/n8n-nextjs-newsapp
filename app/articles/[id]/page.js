"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchArticle } from "@/utils/request";
import DateText from "@/components/DateText";
import { ChevronLeft, ExternalLink, Share2 } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSingleArticle = async () => {
      setLoading(true);
      const id = params.id;

      console.log("⏳ Fetching article with ID:", id);

      const fetchedArticle = await fetchArticle(id);
      console.log("Fetched article:", fetchedArticle);

      if (!fetchedArticle) {
        setNotFound(true);
      } else {
        setArticle(fetchedArticle);
      }

      setLoading(false);
    };

    fetchSingleArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-lg text-gray-600 mb-8">Article not found</p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-40">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Articles
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            {article?.image_url && (
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-10 shadow-lg">
                {/* header image */}
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-6">
                {article?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 pb-6 border-b border-gray-200 mb-8">
                {article?.published_at && (
                  <div className="text-sm">
                    <DateText iso={article.published_at} />
                  </div>
                )}
              </div>

              {/* Summary */}
              {article?.summary && (
                <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                  {article.summary}
                </p>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-800 mb-12">
              <p className="leading-8 whitespace-pre-wrap">
                {article?.content || article?.description}
              </p>
            </div>

            {/* Source Link */}
            {article?.url && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                {article?.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 border-l-4 border-blue-600 rounded-r hover:bg-gray-100 transition"
                  >
                    <p className="text-xs uppercase text-gray-600 font-semibold mb-1">
                      Source
                    </p>
                    <p className="text-sm text-blue-600 hover:text-blue-700 truncate flex items-center gap-2">
                      {article.source || "Original Article"}
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    </p>
                  </a>
                )}
                <img
                  href={`https://www.google.com/s2/favicons?domain=${
                    new URL(article.url).hostname
                  }`}
                  src={`https://www.google.com/s2/favicons?domain=${
                    new URL(article.url).hostname
                  }`}
                  alt="source icon"
                />
              </div>
            )}
          </article>
          <aside className="lg:col-span-1">
            {/* Sticky Share Box */}
            <div className="bg-gray-50 rounded-lg p-6 sticky top-50">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </h3>
              {/* social icons */}
              <div className="space-y-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${
                    typeof window !== "undefined" ? window.location.href : ""
                  }&text=${article?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300 transition text-center text-sm font-medium"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-center text-sm font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharing/share-offsite/?url=${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition text-center text-sm font-medium"
                >
                  facebook
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-xs uppercase font-semibold text-gray-600 mb-3">
                  Date Published
                </p>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 mt-1">
                    {article?.published_at ? (
                      <DateText iso={article.published_at} />
                    ) : (
                      "Recently published"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="border-t border-gray-200 mt-16 pt-8 text-center">
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
