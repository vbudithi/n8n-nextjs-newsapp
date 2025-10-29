"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchArticle } from "@/utils/request";
import StoryTags from "@/components/StoryTags";
import DateText from "@/components/DateText";
import NewsletterWidget from "@/components/NewsletterWidget";
import { SummarySection } from "@/components/SummaryComponent";
import {
  ChevronLeft,
  ExternalLink,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  X,
  Copy,
  Check,
} from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSingleArticle = async () => {
      setLoading(true);
      const id = params.id;

      const fetchedArticle = await fetchArticle(id);

      if (!fetchedArticle) {
        setNotFound(true);
      } else {
        setArticle(fetchedArticle);
      }

      setLoading(false);
    };

    fetchSingleArticle();
  }, [params.id]);

  const shareData = useMemo(
    () => ({
      url: typeof window !== "undefined" ? window.location.href : "",
      title: article?.title || "",
    }),
    [article?.title]
  );

  // Copy link handler
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [shareData.url]);

  // Share handler
  const handleShare = useCallback(
    (platform) => {
      const urls = {
        X: `https://x.com/intent/tweet?url=${encodeURIComponent(
          shareData.url
        )}&text=${encodeURIComponent(shareData.title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareData.url
        )}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareData.url
        )}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData.url)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(
          shareData.url
        )}&title=${encodeURIComponent(shareData.title)}`,
      };

      const width = 550;
      const height = 420;
      const left = Math.max(0, (window.innerWidth - width) / 2);
      const top = Math.max(0, (window.innerHeight - height) / 2);

      window.open(
        urls[platform],
        "share",
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1`
      );
    },
    [shareData]
  );

  if (loading) {
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

  if (notFound) {
    return (
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          <Newspaper className="h-5 w-5" />
          Browse Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 pt-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-13">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-blue-700 font-medium"
          >
            <ChevronLeft className="h-5 w-5 sticky top-0" />
            Explore News
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            {article?.image_url && (
              <div className="relative max-w-4xl mx-auto aspect-video overflow-hidden rounded-2xl mb-10 shadow-lg">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Title & Date */}
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
                {article?.title}
              </h1>

              <div className="flex items-center justify-between text-gray-600 pb-6 border-b border-gray-200 mb-8">
                <div className="flex items-center gap-4">
                  {article?.published_at && (
                    <div className="text-sm">
                      <DateText iso={article.published_at} />
                    </div>
                  )}
                </div>

                {article?.url && (
                  <div className="text-sm text-gray-500">
                    Source:&nbsp;
                    {article.source ||
                      new URL(article.url).hostname
                        .replace(/^www\./, "")
                        .split(".")[0]}{" "}
                  </div>
                )}
              </div>

              {article?.summary && <SummarySection summary={article.summary} />}
            </div>

            {/* Source */}
            {article?.url && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 border-l-4 border-blue-600 rounded-r hover:bg-gray-100 transition group"
                >
                  <p className="text-xs uppercase text-gray-600 font-semibold mb-1">
                    Source
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(article.url).hostname
                      }`}
                      alt=""
                      className="w-4 h-4"
                      loading="lazy"
                    />
                    <p className="text-sm text-blue-600 group-hover:text-blue-700 truncate flex items-center gap-2">
                      {article.source || new URL(article.url).hostname}
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    </p>
                  </div>
                </a>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-50 space-y-8">
              <p className="text-xs uppercase font-semibold text-gray-600 mb-3">
                Date Published
              </p>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-sm text-gray-700">
                  {article?.published_at ? (
                    <DateText iso={article.published_at} />
                  ) : (
                    "Recently published"
                  )}
                </span>
              </div>
              <p className="text-xs uppercase font-semibold text-gray-600 mb-3">
                Tags
              </p>
              <StoryTags tags={article?.tags} />
              <div className="border-t border-gray-200" />
              <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <NewsletterWidget />
            </div>
          </aside>
        </div>
        <div className="border-t border-gray-200 mt-16 pt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            ← Back to NewsPilot
          </Link>
        </div>
      </div>
      {/* Sticky Floating Share */}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-300/20 backdrop-blur-md border border-blue-500/40 text-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
      {/* Share Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Share this article
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500 cursor-pointer" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => handleShare("X")}
                className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Share on X"
              >
                <Twitter className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleShare("reddit")}
                className="flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Share on Reddit"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center justify-center w-14 h-14 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Copy URL Section */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                Copy Link
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareData.url}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  }`}
                  aria-label={copied ? "Link copied" : "Copy link"}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2 text-center animate-in fade-in">
                  ✓ Link copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
