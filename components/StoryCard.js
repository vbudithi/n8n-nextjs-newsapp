// StoryCard.jsx
import React from "react";
import Image from "next/image";
import DateText from "./DateText";

export default function StoryCard({ story }) {
  const href = story?.url || "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-white ring-1 ring-black/5 shadow-sm
                 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
        {story?.image_url ? (
          <Image
            src={story.image_url}
            alt={story.title || "Story image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-base md:text-lg font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-indigo-700">
          {story?.title}
        </h4>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          {story?.published_at ? (
            <DateText iso={story.published_at} />
          ) : (
            <span>&nbsp;</span>
          )}
          {/* Optional source pill if you have it */}
          {story?.source && (
            <span className="rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
              {story.source}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
