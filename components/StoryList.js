import React from "react";
import StoryCard from "./StoryCard";

export default function StoryList({ stories = [] }) {
  if (!stories?.length) return null;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-4">More Stories</h3>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
