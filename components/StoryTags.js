import React from "react";

export default function StoryTags({ tags = [], limit = 4 }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
