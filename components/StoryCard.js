import React from "react";
import Image from "next/image";
import DateText from "./DateText";
import Link from "next/link";
import StoryTags from "./StoryTags";
import { SummarySnippet } from "./SummaryComponent.js";

export default function StoryCard({ story }) {
  const href = `/articles/${story?.id}` || "#";

  return (
    <Link
      href={href}
      className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-sm bg-white"
    >
      <div className="relative aspect-[16/9] overflow-hidden cursor-pointer">
        {story?.image_url ? (
          <Image
            src={story.image_url}
            alt={story.title || "Story image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow p-3">
        <h4 className="text-base md:text-lg font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-indigo-700">
          {story?.title}
        </h4>
        {story?.summary && (
          <div className="mt-2">
            <SummarySnippet summary={story.summary} />
          </div>
        )}

        <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
          {story?.published_at ? (
            <DateText iso={story.published_at} />
          ) : (
            <span>&nbsp;</span>
          )}
          <StoryTags tags={story?.tags} limit={2} />
        </div>
      </div>
    </Link>
  );
}
