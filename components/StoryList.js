import React from "react";
import Image from "next/image";
import DateText from "./DateText";

export default function StoryList({ stories }) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-4">More Stories</h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 overflow-hidden"
          >
            <div className="relative w-full h-40">
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={story.image_url}
                  alt={story.title}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </a>
            </div>

            <a href={story.url} target="_blank" rel="noopener noreferrer">
              <h4 className="mt-3 text-lg font-bold hover:underline">
                {story.title}
              </h4>
            </a>

            {story.published_at && (
              <DateText iso={story.published_at} className="mt-2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
