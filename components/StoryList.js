import React from "react";
import StoryCard from "./StoryCard";
import SkeletonCard from "./SkeletonCard";
export default function StoryList({
  stories = [],
  title = "Latest News",
  loading = false,
}) {
  const skeletonCount = 6;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : stories.map((story, index) => (
              <StoryCard key={`${story.id}-${index}`} story={story} />
            ))}
      </div>
    </section>
  );
}
